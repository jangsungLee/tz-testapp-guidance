import type {ReactNode} from 'react';
import styles from './styles.module.css';

type ValidationModeProps = {
  title: string;
  summary: string;
  children: ReactNode;
};

export default function ValidationMode({title, summary, children}: ValidationModeProps): ReactNode {
  return (
    <section className={styles.card}>
      <header>
        <h3>{title}</h3>
        <p>{summary}</p>
      </header>
      <div>{children}</div>
    </section>
  );
}
