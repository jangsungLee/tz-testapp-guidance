import {useEffect, useState, type ReactNode} from 'react';
import {createPortal} from 'react-dom';
import styles from './styles.module.css';

export default function FullscreenControl(): ReactNode {
  const [navbarHost, setNavbarHost] = useState<HTMLDivElement | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const navbarRight = document.querySelector('.navbar__items--right');
    if (!navbarRight) return undefined;

    const host = document.createElement('div');
    host.className = styles.navbarHost;
    navbarRight.insertBefore(host, navbarRight.firstChild);
    setNavbarHost(host);

    return () => {
      host.remove();
      setNavbarHost(null);
    };
  }, []);

  useEffect(() => {
    const handleChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
      if (document.fullscreenElement) setError(false);
    };

    document.addEventListener('fullscreenchange', handleChange);
    return () => document.removeEventListener('fullscreenchange', handleChange);
  }, []);

  async function toggleFullscreen(): Promise<void> {
    setError(false);
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
        return;
      }

      if (!document.fullscreenEnabled) throw new Error('Fullscreen disabled');
      await document.documentElement.requestFullscreen();
    } catch {
      setError(true);
    }
  }

  return (
    <>
      {navbarHost &&
        createPortal(
          <button
            aria-label={isFullscreen ? '전체화면 종료' : '전체화면으로 보기'}
            aria-pressed={isFullscreen}
            className={
              isFullscreen
                ? `${styles.trigger} ${styles.triggerActive}`
                : styles.trigger
            }
            onClick={toggleFullscreen}
            title={isFullscreen ? '전체화면 종료' : '전체화면으로 보기'}
            type="button">
            <svg aria-hidden="true" viewBox="0 0 24 24">
              {isFullscreen ? (
                <path d="M4 14h6v6M20 10h-6V4M14 10l7-7M3 21l7-7" />
              ) : (
                <path d="m9 9-6-6m0 0v5m0-5h5M15 9l6-6m0 0h-5m5 0v5M9 15l-6 6m0 0h5m-5 0v-5M15 15l6 6m0 0v-5m0 5h-5" />
              )}
            </svg>
          </button>,
          navbarHost,
        )}

      {error &&
        createPortal(
          <div className={styles.error} role="status">
            <span>Confluence에서 전체화면 권한을 허용하지 않았습니다.</span>
            <a href={window.location.href} rel="noreferrer" target="_blank">
              새 탭에서 열기
            </a>
            <button
              aria-label="알림 닫기"
              onClick={() => setError(false)}
              type="button">
              ×
            </button>
          </div>,
          document.body,
        )}
    </>
  );
}
