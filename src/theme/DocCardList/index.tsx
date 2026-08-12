import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import {
  filterDocCardListItems,
  useCurrentSidebarSiblings,
} from '@docusaurus/plugin-content-docs/client';
import type {PropSidebarItem} from '@docusaurus/plugin-content-docs';
import type {Props} from '@theme/DocCardList';
import styles from './styles.module.css';

type NavigableItem = Exclude<PropSidebarItem, {type: 'html'}>;

function getItemHref(item: NavigableItem): string | undefined {
  return item.href;
}

function IndexItem({
  item,
  index,
}: {
  item: NavigableItem;
  index: number;
}): ReactNode {
  const href = getItemHref(item);

  if (!href) {
    return null;
  }

  const description =
    item.description ??
    (item.type === 'category'
      ? '이 주제에 포함된 문서를 살펴봅니다.'
      : '문서를 열어 자세한 내용을 확인합니다.');

  return (
    <li className={styles.item}>
      <Link className={styles.link} to={href}>
        <span className={styles.number} aria-hidden="true">
          {String(index + 1).padStart(2, '0')}
        </span>
        <span className={styles.content}>
          <span className={styles.meta}>
            {item.type === 'category' ? 'Section' : 'Guide'}
          </span>
          <strong className={styles.title}>{item.label}</strong>
          <span className={styles.description}>{description}</span>
        </span>
        <span className={styles.arrow} aria-hidden="true">
          →
        </span>
      </Link>
    </li>
  );
}

function CurrentCategoryList({className}: Pick<Props, 'className'>): ReactNode {
  const items = useCurrentSidebarSiblings();
  return <DocCardList items={items} className={className} />;
}

export default function DocCardList({items, className}: Props): ReactNode {
  if (!items) {
    return <CurrentCategoryList className={className} />;
  }

  const filteredItems = filterDocCardListItems(items).filter(
    (item): item is NavigableItem => item.type !== 'html',
  );

  return (
    <ol className={clsx(styles.list, className)}>
      {filteredItems.map((item, index) => (
        <IndexItem
          key={item.key ?? getItemHref(item) ?? `${item.label}-${index}`}
          item={item}
          index={index}
        />
      ))}
    </ol>
  );
}
