import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import { TwitchProvider, useTwitch } from './contexts/TwitchContext';

export function App() {
  const { settings } = useTwitch();
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export function WrappedApp() {
  return (
    <BrowserRouter>
      <TwitchProvider>
        <App />
      </TwitchProvider>
    </BrowserRouter>
  );
}
