import {useEffect, useState, type ReactNode} from 'react';
import {useLocation} from '@docusaurus/router';
import styles from './styles.module.css';

export default function ScrollProgress(): ReactNode {
  const {pathname} = useLocation();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let animationFrame = 0;

    const updateProgress = () => {
      const scrollableHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const nextProgress =
        scrollableHeight > 0
          ? Math.min(100, Math.max(0, (window.scrollY / scrollableHeight) * 100))
          : 0;

      setProgress(Math.round(nextProgress));
    };

    const scheduleUpdate = () => {
      cancelAnimationFrame(animationFrame);
      animationFrame = requestAnimationFrame(updateProgress);
    };

    const resizeObserver = new ResizeObserver(scheduleUpdate);
    resizeObserver.observe(document.documentElement);
    window.addEventListener('scroll', scheduleUpdate, {passive: true});
    window.addEventListener('resize', scheduleUpdate);
    scheduleUpdate();

    return () => {
      cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
    };
  }, [pathname]);

  return (
    <div
      aria-label="문서 읽기 진행률"
      aria-valuemax={100}
      aria-valuemin={0}
      aria-valuenow={progress}
      className={styles.track}
      role="progressbar">
      <span
        className={styles.bar}
        style={{transform: `scaleX(${progress / 100})`}}
      />
      <span className={styles.value}>{progress}%</span>
    </div>
  );
}
