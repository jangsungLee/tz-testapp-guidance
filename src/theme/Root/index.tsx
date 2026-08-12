import type {ReactNode} from 'react';
import {useLocation} from '@docusaurus/router';
import FullscreenControl from '@site/src/components/FullscreenControl';

type RootProps = {
  children: ReactNode;
};

export default function Root({children}: RootProps): ReactNode {
  const {pathname} = useLocation();
  const isIntroPage = pathname === '/' || pathname === '/index.html';

  return (
    <>
      <FullscreenControl showTrigger={isIntroPage} />
      {children}
    </>
  );
}
