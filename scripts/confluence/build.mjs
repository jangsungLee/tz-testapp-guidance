import {readdir, readFile, mkdir, rm, writeFile} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {unified} from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkMdx from 'remark-mdx';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const docsDir = path.join(projectRoot, 'docs');
const outputDir = path.join(projectRoot, 'confluence-build');
const previewDir = path.join(outputDir, 'preview');
const storageDir = path.join(outputDir, 'storage');
const parser = unified().use(remarkParse).use(remarkGfm).use(remarkMdx);

function esc(value = '') {
  return value.replaceAll('&', '&amp;').replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;').replaceAll('"', '&quot;');
}

function frontmatter(source) {
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!match) return {data: {}, body: source};
  const data = {};
  for (const line of match[1].split(/\r?\n/)) {
    const separator = line.indexOf(':');
    if (separator < 0) continue;
    data[line.slice(0, separator).trim()] = line.slice(separator + 1).trim()
      .replace(/^['"]|['"]$/g, '');
  }
  return {data, body: source.slice(match[0].length)};
}

function attr(node, name) {
  const item = node.attributes?.find((attribute) => attribute.name === name);
  return typeof item?.value === 'string' ? item.value : '';
}

function stats() {
  return {headings: 0, codeBlocks: 0, tables: 0, links: 0, panels: 0, unsupported: []};
}

function render(tree, mode, report) {
  const children = (node) => (node.children || []).map(nodeRender).join('');

  function nodeRender(node) {
    switch (node.type) {
      case 'root': return children(node);
      case 'text': return esc(node.value);
      case 'paragraph': return '<p>' + children(node) + '</p>';
      case 'heading':
        report.headings++;
        return '<h' + node.depth + '>' + children(node) + '</h' + node.depth + '>';
      case 'strong': return '<strong>' + children(node) + '</strong>';
      case 'emphasis': return '<em>' + children(node) + '</em>';
      case 'delete': return '<s>' + children(node) + '</s>';
      case 'inlineCode': return '<code>' + esc(node.value) + '</code>';
      case 'code': {
        report.codeBlocks++;
        const lang = esc(node.lang || 'text');
        if (mode === 'storage') {
          return '<ac:structured-macro ac:name="code"><ac:parameter ac:name="language">' +
            lang + '</ac:parameter><ac:plain-text-body><![CDATA[' +
            node.value.replaceAll(']]>', ']]]]><![CDATA[>') +
            ']]></ac:plain-text-body></ac:structured-macro>';
        }
        return '<div class="code-block"><span>' + lang +
          '</span><pre><code>' + esc(node.value) + '</code></pre></div>';
      }
      case 'blockquote': return '<blockquote>' + children(node) + '</blockquote>';
      case 'list': {
        const tag = node.ordered ? 'ol' : 'ul';
        return '<' + tag + '>' + children(node) + '</' + tag + '>';
      }
      case 'listItem': return '<li>' + children(node) + '</li>';
      case 'table':
        report.tables++;
        return '<table><tbody>' + children(node) + '</tbody></table>';
      case 'tableRow':
        return '<tr>' + (node.children || []).map((cell) =>
          '<td>' + children(cell) + '</td>').join('') + '</tr>';
      case 'tableCell': return children(node);
      case 'link':
        report.links++;
        return '<a href="' + esc(mode === 'preview'
          ? node.url.replace(/\.(md|mdx)(?=$|#)/, '.html')
          : node.url) + '">' + children(node) + '</a>';
      case 'image':
        return '<img src="' + esc(node.url) + '" alt="' + esc(node.alt || '') + '" />';
      case 'thematicBreak': return '<hr />';
      case 'break': return '<br />';
      case 'mdxjsEsm':
      case 'yaml':
        return '';
      case 'mdxJsxTextElement':
      case 'mdxJsxFlowElement':
        if (node.name === 'br') return '<br />';
        if (node.name === 'a') {
          report.links++;
          const href = attr(node, 'href');
          return '<a href="' + esc(mode === 'preview'
            ? href.replace(/^\//, '').replace(/\/$/, '/index.html')
            : href) + '">' + children(node) + '</a>';
        }
        if (node.name === 'ValidationMode') {
          report.panels++;
          const title = attr(node, 'title');
          const summary = attr(node, 'summary');
          if (mode === 'storage') {
            return '<ac:structured-macro ac:name="info"><ac:parameter ac:name="title">' +
              esc(title) + '</ac:parameter><ac:rich-text-body><p>' + esc(summary) +
              '</p>' + children(node) + '</ac:rich-text-body></ac:structured-macro>';
          }
          return '<aside class="panel"><strong>' + esc(title) + '</strong><p>' +
            esc(summary) + '</p>' + children(node) + '</aside>';
        }
        if (mode === 'preview' && ['header', 'div', 'nav', 'span'].includes(node.name)) {
          const className = attr(node, 'className');
          const tag = node.name === 'header' || node.name === 'nav' ? node.name :
            node.name === 'span' ? 'span' : 'div';
          return '<' + tag + (className ? ' class="' + esc(className) + '"' : '') +
            '>' + children(node) + '</' + tag + '>';
        }
        if (mode === 'storage' && ['header', 'div', 'nav'].includes(node.name)) {
          return '<div>' + children(node) + '</div>';
        }
        return children(node);
      default:
        report.unsupported.push(node.type);
        return children(node);
    }
  }
  return nodeRender(tree);
}

async function files(directory) {
  const result = [];
  for (const entry of await readdir(directory, {withFileTypes: true})) {
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) result.push(...await files(absolute));
    else result.push(absolute);
  }
  return result;
}

function previewPath(source) {
  return source === 'intro.mdx'
    ? 'index.html'
    : source.replace(/\.(md|mdx)$/, '.html').replaceAll('\\', '/');
}

function rootPrefix(target) {
  return '../'.repeat(target.split('/').length - 1);
}

function navigation(categories, pages, prefix, active) {
  let html = '<a class="brand" href="' + prefix + 'index.html">AM TZ / YAML Manual</a>';
  html += '<a class="nav-link' + (active === 'index.html' ? ' active' : '') +
    '" href="' + prefix + 'index.html">시작하기</a>';
  for (const category of categories) {
    html += '<section><a class="nav-category" href="' + prefix + category.dir +
      '/index.html">' + esc(category.label) + '</a>';
    for (const page of pages.filter((item) => path.posix.dirname(item.source) === category.dir)) {
      html += '<a class="nav-link' + (active === page.preview ? ' active' : '') +
        '" href="' + prefix + page.preview + '">' + esc(page.title) + '</a>';
    }
    html += '</section>';
  }
  return html;
}

function pageHtml(title, source, content, nav, css) {
  return '<!doctype html><html lang="ko"><head><meta charset="utf-8" />' +
    '<meta name="viewport" content="width=device-width,initial-scale=1" />' +
    '<title>' + esc(title) + ' · Confluence preview</title>' +
    '<link rel="stylesheet" href="' + css + '" /></head><body>' +
    '<aside class="sidebar">' + nav + '</aside><main class="page">' +
    '<div class="notice"><strong>Confluence 변환 미리보기</strong><span>원본: ' +
    esc(source) + '</span></div><article>' + content + '</article></main></body></html>';
}

const css = [
  ':root{--ink:#17201e;--muted:#626b68;--line:#d9dce1;--blue:#0c66e4;--soft:#f7f8f9}',
  '*{box-sizing:border-box}body{margin:0;color:var(--ink);font-family:-apple-system,BlinkMacSystemFont,"Segoe UI","Noto Sans KR",sans-serif}',
  '.sidebar{position:fixed;inset:0 auto 0 0;width:270px;padding:24px 16px;overflow:auto;border-right:1px solid var(--line);background:var(--soft)}',
  '.brand{display:block;margin:0 8px 24px;color:var(--ink);font-weight:700;text-decoration:none}.sidebar section{margin-top:18px}',
  '.nav-category{display:block;margin:0 8px 6px;color:var(--ink);font-size:13px;font-weight:700;text-decoration:none}',
  '.nav-link{display:block;padding:7px 10px;border-radius:3px;color:var(--muted);font-size:13px;text-decoration:none}.nav-link:hover,.nav-link.active{background:#e9f2ff;color:#0c4a9e}',
  '.page{margin-left:270px;padding:48px clamp(28px,7vw,96px) 80px}.page article,.notice{max-width:760px}',
  '.notice{display:flex;justify-content:space-between;gap:20px;margin-bottom:32px;padding:10px 12px;border:1px solid #b6c2cf;border-radius:3px;background:var(--soft);color:var(--muted);font-size:12px}.notice strong{color:var(--ink)}',
  'h1{font-size:32px;letter-spacing:-.03em}h2{margin-top:38px;padding-top:20px;border-top:1px solid var(--line);font-size:24px}h3{margin-top:28px;font-size:19px}',
  'p,li{font-size:15px;line-height:1.75;word-break:keep-all}a{color:var(--blue)}code{padding:2px 4px;border-radius:3px;background:#f1f2f4;font:13px Consolas,monospace}',
  '.code-block{position:relative;margin:18px 0}.code-block>span{position:absolute;top:10px;right:12px;color:#8993a4;font:10px Consolas,monospace;text-transform:uppercase}',
  '.code-block pre{overflow:auto;margin:0;padding:28px 16px 16px;border-radius:3px;background:#1d2125;color:#f7f8f9}.code-block pre code{padding:0;background:none;color:inherit}',
  'table{width:100%;margin:20px 0;border-collapse:collapse;font-size:14px}td{padding:10px 12px;border:1px solid var(--line);text-align:left}tr:first-child td{background:var(--soft);font-weight:700}',
  'blockquote,.panel{margin:20px 0;padding:14px 16px;border-left:4px solid var(--blue);background:#e9f2ff}.panel>strong{display:block}.panel>p{margin-top:4px;color:var(--muted)}',
  '.category{list-style:none;margin:24px 0;padding:0;border-top:1px solid var(--line)}.category li{border-bottom:1px solid var(--line)}.category a{display:grid;padding:16px 4px;text-decoration:none}.category strong{color:var(--ink)}.category span{color:var(--muted);font-size:13px}',
  '.manual-intro{margin-bottom:28px;padding-bottom:24px;border-bottom:1px solid var(--line)}.manual-intro__eyebrow{color:var(--blue);font-size:11px;font-weight:700;letter-spacing:.1em}.manual-intro__lead{color:var(--muted);font-size:17px}.manual-scope,.manual-next{display:grid;grid-template-columns:1fr 1fr;gap:1px;background:var(--line);border:1px solid var(--line)}.manual-scope__item,.manual-next a{display:grid;padding:14px;background:white;text-decoration:none}.manual-scope__number{color:var(--muted);font:11px Consolas,monospace}.manual-scope__item span:last-child,.manual-next span{color:var(--muted);font-size:12px}',
  '@media(max-width:800px){.sidebar{position:static;width:auto;max-height:260px}.page{margin-left:0;padding:28px 20px}.notice{display:grid}}'
].join('');

async function main() {
  await rm(outputDir, {recursive: true, force: true});
  await mkdir(previewDir, {recursive: true});
  await mkdir(storageDir, {recursive: true});

  const all = await files(docsDir);
  const categories = [];
  for (const file of all.filter((item) => item.endsWith('_category_.json'))) {
    const data = JSON.parse(await readFile(file, 'utf8'));
    categories.push({
      dir: path.relative(docsDir, path.dirname(file)).replaceAll('\\', '/'),
      label: data.label,
      position: data.position || 999,
      description: data.link?.description || ''
    });
  }
  categories.sort((a, b) => a.position - b.position);

  const pages = [];
  for (const file of all.filter((item) => /\.(md|mdx)$/.test(item))) {
    const source = path.relative(docsDir, file).replaceAll('\\', '/');
    const parsed = frontmatter(await readFile(file, 'utf8'));
    const tree = parser.parse(parsed.body);
    const heading = tree.children.find((node) => node.type === 'heading' && node.depth === 1);
    const title = parsed.data.title ||
      heading?.children?.map((node) => node.value || '').join('') || path.basename(file);
    const report = stats();
    pages.push({
      source,
      id: parsed.data.id || source.replace(/\.(md|mdx)$/, ''),
      title,
      preview: previewPath(source),
      storage: source.replace(/\.(md|mdx)$/, '.xml'),
      storageBody: render(tree, 'storage', report),
      previewBody: render(tree, 'preview', stats()),
      stats: report
    });
  }

  for (const page of pages) {
    const prefix = rootPrefix(page.preview);
    const target = path.join(previewDir, page.preview);
    const storageTarget = path.join(storageDir, page.storage);
    await mkdir(path.dirname(target), {recursive: true});
    await mkdir(path.dirname(storageTarget), {recursive: true});
    await writeFile(target, pageHtml(
      page.title, page.source, page.previewBody,
      navigation(categories, pages, prefix, page.preview),
      prefix + 'assets/confluence-preview.css'
    ), 'utf8');
    await writeFile(storageTarget, page.storageBody, 'utf8');
  }

  for (const category of categories) {
    const targetPath = category.dir + '/index.html';
    const prefix = rootPrefix(targetPath);
    const childPages = pages.filter((page) => path.posix.dirname(page.source) === category.dir);
    const list = '<h1>' + esc(category.label) + '</h1><p>' + esc(category.description) +
      '</p><ol class="category">' + childPages.map((page) =>
        '<li><a href="' + path.posix.basename(page.preview) + '"><strong>' +
        esc(page.title) + '</strong><span>' + esc(page.source) +
        '</span></a></li>').join('') + '</ol>';
    const target = path.join(previewDir, targetPath);
    await mkdir(path.dirname(target), {recursive: true});
    await writeFile(target, pageHtml(
      category.label, category.dir + '/_category_.json', list,
      navigation(categories, pages, prefix, targetPath),
      prefix + 'assets/confluence-preview.css'
    ), 'utf8');
  }

  await mkdir(path.join(previewDir, 'assets'), {recursive: true});
  await writeFile(path.join(previewDir, 'assets/confluence-preview.css'), css, 'utf8');

  const totals = pages.reduce((sum, page) => {
    for (const key of ['headings', 'codeBlocks', 'tables', 'links', 'panels']) {
      sum[key] += page.stats[key];
    }
    sum.unsupported.push(...page.stats.unsupported.map((type) => ({source: page.source, type})));
    return sum;
  }, {...stats(), pages: pages.length, categories: categories.length});

  await writeFile(path.join(outputDir, 'manifest.json'), JSON.stringify({
    generatedAt: new Date().toISOString(),
    sourceDirectory: 'docs',
    outputDirectory: 'confluence-build',
    totals,
    categories,
    pages: pages.map(({storageBody, previewBody, ...page}) => page)
  }, null, 2), 'utf8');

  console.log('Confluence preview built: ' + pages.length + ' documents, ' +
    categories.length + ' categories');
  console.log('Preview: ' + path.join(previewDir, 'index.html'));
  console.log('Storage drafts: ' + storageDir);
  console.log('Unsupported nodes: ' + totals.unsupported.length);
}

await main();
