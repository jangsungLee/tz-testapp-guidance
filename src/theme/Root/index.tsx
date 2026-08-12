import type {ReactNode} from 'react';
import FullscreenControl from '@site/src/components/FullscreenControl';
import ScrollProgress from '@site/src/components/ScrollProgress';

type RootProps = {
  children: ReactNode;
};

export default function Root({children}: RootProps): ReactNode {
  return (
    <>
      <FullscreenControl />
      <ScrollProgress />
      {children}
    </>
  );
}
