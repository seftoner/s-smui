import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { prefixer } from 'stylis';
import rtlPlugin from '@mui/stylis-plugin-rtl';
import { ThemeModeProvider, NotificationProvider } from './contexts';
import { Layout } from './components';
import { AppThemeProvider } from './contexts';
import {
  SearchApp,
  TaskManagementApp,
  DocumentsApp,
  AIChatApp,
  PlaygroundApp
} from './apps';
import HomeApp from './apps/home/HomeApp';
import VariationCentreApp from './apps/variation-centre/VariationCentreApp';
import MoreAppsApp from './apps/more-apps/MoreAppsApp';

// Create RTL cache using official MUI plugin
const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
});

function App() {
  return (
    <CacheProvider value={cacheRtl}>
      <ThemeModeProvider>
        <Router>
          <AppThemeProvider>
            <NotificationProvider>
              <Layout>
                <Routes>
                  <Route path="/" element={<HomeApp />} />
                  <Route path="/search" element={<SearchApp />} />
                  <Route path="/tasks" element={<TaskManagementApp />} />
                  <Route path="/documents" element={<DocumentsApp />} />
                  <Route path="/variation" element={<VariationCentreApp />} />
                  <Route path="/chat" element={<AIChatApp />} />
                  <Route path="/playground" element={<PlaygroundApp />} />
                  <Route path="/more-apps" element={<MoreAppsApp />} />
                </Routes>
              </Layout>
            </NotificationProvider>
          </AppThemeProvider>
        </Router>
      </ThemeModeProvider>
    </CacheProvider>
  );
}

export default App;
