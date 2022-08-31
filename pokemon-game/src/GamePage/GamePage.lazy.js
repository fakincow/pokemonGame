import React, { lazy, Suspense } from 'react';

const LazyGamePage = lazy(() => import('./GamePage'));

const GamePage = props => (
  <Suspense fallback={null}>
    <LazySearchPage {...props} />
  </Suspense>
);

export default GamePage;
