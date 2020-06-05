import React, { lazy, Suspense, useEffect } from 'react';
import './styles.css';
import { useAppState } from './context';

const SCREENS = {
  login: lazy(() => import('./screens/Login')),
  confirm: lazy(() => import('./screens/Confirm')),
  reset: lazy(() => import('./screens/Reset')),
  welcome: lazy(() => import('./screens/Welcome'))
};

const ContentPanel = ({ Component }) => <Component />;

const Loader = () => <div>loading...</div>;

export default function App() {
  const { currentScreen } = useAppState();

  return (
    <div className="App">
      <Suspense fallback={<Loader />}>
        <ContentPanel Component={SCREENS[currentScreen]} />
      </Suspense>
    </div>
  );
}
