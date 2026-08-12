import fs from 'node:fs/promises';
import path from 'node:path';
import type {LoadContext, Plugin} from '@docusaurus/types';
import GithubSlugger from 'github-slugger';
import matter from 'gray-matter';
import {unified} from 'unified';
import remarkGfm from 'remark-gfm';
import remarkMdx from 'remark-mdx';
import remarkParse from 'remark-parse';
import {splitIdentifier} from '../../src/search/identifierSearch';

export type SearchDocument = {
  id: string;
  title: string;
  pageTitle: string;
  path: string;
  api: string;
  action: string;
  content: string;
  kind: 'api' | 'document';
};

type AstNode = {
  type: string;
  depth?: number;
  value?: string;
  children?: AstNode[];
};

function getText(node: AstNode): string {
  if (typeof node.value === 'string') {
    return node.value;
  }
  return node.children?.map(getText).join(' ') ?? '';
}

async function findMarkdownFiles(directory: string): Promise<string[]> {
  const entries = await fs.readdir(directory, {withFileTypes: true});
  const files = await Promise.all(
    entries.map(async (entry) => {
      const fullPath = path.join(directory, entry.name);
      if (entry.isDirectory()) {
        return findMarkdownFiles(fullPath);
      }
      return /\.mdx?$/i.test(entry.name) ? [fullPath] : [];
    }),
  );
  return files.flat();
}

function getDocumentPath(filePath: string, docsDir: string, slug?: unknown): string {
  if (typeof slug === 'string') {
    return slug.startsWith('/') ? slug : `/${slug}`;
  }

  const relative = path.relative(docsDir, filePath).replace(/\\/g, '/').replace(/\.mdx?$/i, '');
  const withoutIndex = relative.replace(/(^|\/)index$/i, '$1');
  return `/${withoutIndex}`.replace(/\/$/, '') || '/';
}

async function parseDocument(filePath: string, docsDir: string): Promise<SearchDocument[]> {
  const source = await fs.readFile(filePath, 'utf8');
  const parsed = matter(source);
  const tree = unified().use(remarkParse).use(remarkGfm).use(remarkMdx).parse(parsed.content) as AstNode;
    const children = tree.children ?? [];
  const firstHeading = children.find((node) => node.type === 'heading' && node.depth === 1);
  const pageTitle = String(parsed.data.title ?? (firstHeading ? getText(firstHeading) : path.basename(filePath)));
  const documentPath = getDocumentPath(filePath, docsDir, parsed.data.slug);
  const slugger = new GithubSlugger();
  const documents: SearchDocument[] = [];
  let sectionTitle = pageTitle;
  let sectionPath = documentPath;
  let sectionNodes: AstNode[] = [];
  let sectionNumber = 0;

  const flush = () => {
    const content = sectionNodes.map(getText).join(' ').replace(/\s+/g, ' ').trim();
    const apiMatch = sectionTitle.match(/^([a-z][a-z0-9_]+)\s*\((?:…|\.\.\.)\)$/i);
    const api = apiMatch?.[1] ?? '';
    const action = api ? content.match(/\bACTION:\s*([A-Z][A-Z0-9_]*)/)?.[1] ?? '' : '';
    const apiTerms = api ? [...splitIdentifier(api), api.replace(/_/g, '')].join(' ') : '';
    const actionTerms = action
      ? [...splitIdentifier(action), action.replace(/_/g, '').toLowerCase()].join(' ')
      : '';

    if (content || sectionTitle) {
      documents.push({
        id: `${documentPath}::${sectionNumber}`,
        title: sectionTitle,
        pageTitle,
        path: sectionPath,
        api: `${api} ${apiTerms}`.trim(),
        action: `${action} ${actionTerms}`.trim(),
        content,
        kind: api ? 'api' : 'document',
      });
      sectionNumber += 1;
    }
  };

  for (const node of children) {
    if (node.type === 'heading' && node.depth && node.depth <= 3) {
      const headingTitle = getText(node).trim();
      if (node.depth === 1 && headingTitle === pageTitle && sectionNodes.length === 0) {
        slugger.slug(headingTitle);
        continue;
      }
      flush();
      sectionTitle = headingTitle;
      sectionPath = `${documentPath}#${slugger.slug(headingTitle)}`;
      sectionNodes = [];
    } else {
      sectionNodes.push(node);
    }
  }
  flush();
  return documents;
}

export default function localSmartSearch(context: LoadContext): Plugin<SearchDocument[]> {
  const docsDir = path.join(context.siteDir, 'docs');

  return {
    name: 'local-smart-search',
    getPathsToWatch: () => [path.join(docsDir, '**/*.{md,mdx}')],
    async loadContent() {
      const files = await findMarkdownFiles(docsDir);
      return (await Promise.all(files.map((file) => parseDocument(file, docsDir)))).flat();
    },
    async contentLoaded({content, actions}) {
      actions.setGlobalData({documents: content});
    },
  };
}
