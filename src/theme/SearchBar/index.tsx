import React, {useCallback, useEffect, useMemo, useRef, useState, type ReactNode} from 'react';
import {useHistory} from '@docusaurus/router';
import {usePluginData} from '@docusaurus/useGlobalData';
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

export default function SearchBar(): ReactNode {
  const history = useHistory();
  const inputRef = useRef<HTMLInputElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const pluginData = usePluginData('local-smart-search', 'default', {failfast: true}) as {
    documents: SearchDocument[];
  };
  const documents = pluginData.documents;
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
    const documentsById = new Map(documents.map((document) => [document.id, document]));

    for (const result of [...fullTextResults, ...identifierResults]) {
      const resultWithId = result as SearchResult & {id?: string};
      const source = resultWithId.id ? documentsById.get(resultWithId.id) : undefined;
      const hydrated = source
        ? {
            ...source,
            ...result,
            title: result.title || source.title,
            pageTitle: result.pageTitle || source.pageTitle,
            path: result.path || source.path,
            api: result.api || source.api,
            action: result.action || source.action,
            kind: result.kind || source.kind,
          }
        : result;
      const resultKey = hydrated.path || resultWithId.id;

      if (!resultKey) {
        continue;
      }
      const previous = merged.get(resultKey);
      if (!previous || hydrated.score > previous.score) {
        merged.set(resultKey, hydrated);
      }
    }

    return Array.from(merged.values())
      .sort((left, right) => right.score - left.score)
      .slice(0, 10);
  }, [documents, query, search]);

  const normalizedQuery = normalizeQuery(query);
  const hasSearchQuery = normalizedQuery.length >= 2;
  const open = focused;

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
        type="search"
        value={query}
      />
      {!focused && <kbd className={styles.shortcut}>Ctrl K</kbd>}
      {open && (
        <div className={styles.results} id="smart-search-results" role="listbox">
          {!hasSearchQuery ? (
            <div className={styles.empty}>두 글자 이상 입력하면 검색 결과가 표시됩니다.</div>
          ) : results.length > 0 ? (
            <>
              <div className={styles.resultCount} role="status">
                {results.length}개 결과
              </div>
              {results.map((result, index) => (
                <button
                  aria-selected={index === activeIndex}
                  className={`${styles.result} ${index === activeIndex ? styles.active : ''}`}
                  key={`${result.path}-${index}`}
                  onMouseDown={(event) => event.preventDefault()}
                  onMouseEnter={() => setActiveIndex(index)}
                  onClick={() => navigate(result.path)}
                  role="option"
                  type="button">
                  <span className={styles.resultTitle}>
                    {result.title || result.api || result.action || result.path}
                </span>
                <span className={styles.resultMeta}>
                  {result.kind === 'api' ? `${result.action.split(' ')[0]} · API` : result.pageTitle}
                </span>
                </button>
              ))}
            </>
          ) : (
            <div className={styles.empty} role="status">
              <strong>일치하는 문서가 없습니다.</strong>
              <span>API 이름, ACTION 또는 본문 키워드로 다시 검색해 보세요.</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
