import React, {useCallback, useEffect, useMemo, useRef, useState, type ReactNode} from 'react';
import {useHistory} from '@docusaurus/router';
import useGlobalData from '@docusaurus/useGlobalData';
import MiniSearch from 'minisearch';
import type {SearchDocument} from '../../../plugins/localSmartSearch';
import {scoreIdentifierMatch} from '../../search/identifierSearch';
import styles from './styles.module.css';

type SearchResult = Pick<SearchDocument, 'title' | 'pageTitle' | 'path' | 'api' | 'action' | 'kind'> & {
  score: number;
  terms: string[];
};

const searchOptions = {
  boost: {api: 16, action: 13, title: 7, pageTitle: 4, content: 1},
  prefix: (term: string) => term.length >= 2,
  fuzzy: (term: string) => (term.length >= 5 ? 0.2 : false),
  maxFuzzy: 1,
  weights: {prefix: 0.72, fuzzy: 0.28},
  combineWith: 'AND' as const,
  boostDocument: (_id: unknown, _term: string, storedFields?: Record<string, unknown>) => {
    if (storedFields?.kind !== 'api') {
      return 1;
    }
    const titleLength = String(storedFields.title ?? '').length;
    return Math.pow(48 / Math.max(20, titleLength), 2);
  },
};

function normalizeQuery(value: string): string {
  return value.trim().toLowerCase().replace(/[()…]/g, '').replace(/[_\-\s]+/g, ' ');
}

function getDocuments(globalData: ReturnType<typeof useGlobalData>): SearchDocument[] {
  const plugin = globalData['local-smart-search']?.default as
    | {documents?: SearchDocument[]}
    | undefined;
  return plugin?.documents ?? [];
}

export default function SearchBar(): ReactNode {
  const history = useHistory();
  const inputRef = useRef<HTMLInputElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const documents = getDocuments(useGlobalData());
  const [query, setQuery] = useState('');
  const [focused, setFocused] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const search = useMemo(() => {
    const instance = new MiniSearch<SearchDocument>({
      fields: ['api', 'action', 'title', 'pageTitle', 'content'],
      storeFields: ['title', 'pageTitle', 'path', 'api', 'action', 'kind'],
      idField: 'id',
      searchOptions,
    });
    instance.addAll(documents);
    return instance;
  }, [documents]);

  const results = useMemo<SearchResult[]>(() => {
    const normalized = normalizeQuery(query);
    if (normalized.length < 2) {
      return [];
    }
    const fullTextResults = search.search(normalized, searchOptions) as unknown as SearchResult[];
    const identifierResults = documents
      .filter((document) => document.kind === 'api')
      .map((document) => {
        const score = Math.max(
          scoreIdentifierMatch(normalized, document.api) ?? Number.NEGATIVE_INFINITY,
          scoreIdentifierMatch(normalized, document.action) ?? Number.NEGATIVE_INFINITY,
        );
        return Number.isFinite(score) ? {...document, score: score * 12, terms: [normalized]} : null;
      })
      .filter((result): result is SearchDocument & {score: number; terms: string[]} => result !== null);
    const merged = new Map<string, SearchResult>();

    for (const result of [...fullTextResults, ...identifierResults]) {
      const previous = merged.get(result.path);
      if (!previous || result.score > previous.score) {
        merged.set(result.path, result);
      }
    }

    return [...merged.values()].sort((left, right) => right.score - left.score).slice(0, 10);
  }, [documents, query, search]);

  const open = focused && query.trim().length >= 2;

  const navigate = useCallback(
    (path: string) => {
      setFocused(false);
      setQuery('');
      history.push(path);
    },
    [history],
  );

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        inputRef.current?.focus();
      }
      if (event.key === 'Escape' && focused) {
        inputRef.current?.blur();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [focused]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  return (
    <div className="navbar__search" ref={rootRef}>
      <input
        aria-autocomplete="list"
        aria-controls="smart-search-results"
        aria-expanded={open}
        aria-label="문서 검색"
        className="navbar__search-input"
        onBlur={(event) => {
          if (!rootRef.current?.contains(event.relatedTarget as Node | null)) {
            setFocused(false);
          }
        }}
        onChange={(event) => setQuery(event.target.value)}
        onFocus={() => setFocused(true)}
        onKeyDown={(event) => {
          if (!open) return;
          if (event.key === 'ArrowDown') {
            event.preventDefault();
            setActiveIndex((index) => Math.min(index + 1, results.length - 1));
          } else if (event.key === 'ArrowUp') {
            event.preventDefault();
            setActiveIndex((index) => Math.max(index - 1, 0));
          } else if (event.key === 'Enter' && results[activeIndex]) {
            event.preventDefault();
            navigate(results[activeIndex].path);
          }
        }}
        placeholder="API, ACTION, 키워드 검색"
        ref={inputRef}
        role="combobox"
        value={query}
      />
      {!focused && <kbd className={styles.shortcut}>Ctrl K</kbd>}
      {open && (
        <div className={styles.results} id="smart-search-results" role="listbox">
          {results.length > 0 ? (
            results.map((result, index) => (
              <button
                aria-selected={index === activeIndex}
                className={`${styles.result} ${index === activeIndex ? styles.active : ''}`}
                key={`${result.path}-${index}`}
                onMouseDown={(event) => event.preventDefault()}
                onMouseEnter={() => setActiveIndex(index)}
                onClick={() => navigate(result.path)}
                role="option"
                type="button">
                <span className={styles.resultTitle}>{result.title}</span>
                <span className={styles.resultMeta}>
                  {result.kind === 'api' ? 'API' : result.pageTitle}
                </span>
              </button>
            ))
          ) : (
            <div className={styles.empty}>일치하는 문서가 없습니다.</div>
          )}
        </div>
      )}
    </div>
  );
}
