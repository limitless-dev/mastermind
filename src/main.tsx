import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { WrappedApp } from './App';

import '../i18n';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Suspense fallback="Loading..">
    <React.StrictMode>
      <WrappedApp />
    </React.StrictMode>
  </Suspense>
);
