import {useEffect, useState, type ReactNode} from 'react';
import {createPortal} from 'react-dom';
import styles from './styles.module.css';

type FullscreenControlProps = {
  showTrigger: boolean;
};

export default function FullscreenControl({
  showTrigger,
}: FullscreenControlProps): ReactNode {
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

  async function enterFullscreen(): Promise<void> {
    setError(false);
    try {
      if (!document.fullscreenEnabled) throw new Error('Fullscreen disabled');
      await document.documentElement.requestFullscreen();
    } catch {
      setError(true);
    }
  }

  async function exitFullscreen(): Promise<void> {
    if (document.fullscreenElement) await document.exitFullscreen();
  }

  return (
    <>
      {showTrigger && navbarHost &&
        createPortal(
          <button
            aria-label="전체화면으로 보기"
            className={styles.trigger}
            onClick={enterFullscreen}
            title="전체화면으로 보기"
            type="button">
            <svg aria-hidden="true" viewBox="0 0 24 24">
              <path d="M8 3H3v5M16 3h5v5M8 21H3v-5M16 21h5v-5" />
            </svg>
          </button>,
          navbarHost,
        )}

      {isFullscreen &&
        createPortal(
          <button
            aria-label="전체화면 닫기"
            className={styles.close}
            onClick={exitFullscreen}
            type="button">
            <svg aria-hidden="true" viewBox="0 0 24 24">
              <path d="m6 6 12 12M18 6 6 18" />
            </svg>
            <span>닫기</span>
          </button>,
          document.body,
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
