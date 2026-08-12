import type {ReactNode} from 'react';
import {PageMetadata} from '@docusaurus/theme-common';
import {
  useCurrentSidebarCategory,
} from '@docusaurus/plugin-content-docs/client';
import useBaseUrl from '@docusaurus/useBaseUrl';
import DocBreadcrumbs from '@theme/DocBreadcrumbs';
import DocCardList from '@theme/DocCardList';
import DocPaginator from '@theme/DocPaginator';
import DocVersionBadge from '@theme/DocVersionBadge';
import DocVersionBanner from '@theme/DocVersionBanner';
import Heading from '@theme/Heading';
import type {Props} from '@theme/DocCategoryGeneratedIndexPage';
import styles from './styles.module.css';

function Metadata({categoryGeneratedIndex}: Props): ReactNode {
  return (
    <PageMetadata
      title={categoryGeneratedIndex.title}
      description={categoryGeneratedIndex.description}
      keywords={categoryGeneratedIndex.keywords}
      image={useBaseUrl(categoryGeneratedIndex.image)}
    />
  );
}

function Content({categoryGeneratedIndex}: Props): ReactNode {
  const category = useCurrentSidebarCategory();

  return (
    <div className={styles.page}>
      <DocVersionBanner />
      <DocBreadcrumbs />
      <DocVersionBadge />

      <header className={styles.header}>
        <span className={styles.eyebrow}>Documentation index</span>
        <Heading as="h1" className={styles.title}>
          {categoryGeneratedIndex.title}
        </Heading>
        {categoryGeneratedIndex.description && (
          <p className={styles.description}>
            {categoryGeneratedIndex.description}
          </p>
        )}
        <p className={styles.count}>
          문서 {category.items.length}개
        </p>
      </header>

      <main className={styles.index} aria-label="카테고리 문서 목록">
        <DocCardList items={category.items} />
      </main>

      <footer className={styles.footer}>
        <DocPaginator
          previous={categoryGeneratedIndex.navigation.previous}
          next={categoryGeneratedIndex.navigation.next}
        />
      </footer>
    </div>
  );
}

export default function DocCategoryGeneratedIndexPage(props: Props): ReactNode {
  return (
    <>
      <Metadata {...props} />
      <Content {...props} />
    </>
  );
}
