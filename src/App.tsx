import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MainLayout from './layouts/MainLayout';
import ApiUsagePage from './pages/ApiUsagePage';
import ApiKeysPage from './pages/ApiKeysPage';
import ApiDocumentationPage from './pages/ApiDocumentationPage';
import OcrAnalyzerPage from './pages/OcrAnalyzerPage';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#00B4FF',
      light: '#33c3ff',
      dark: '#0099d6',
    },
    secondary: {
      main: '#1a2b3b',
      light: '#334155',
      dark: '#0f172a',
    },
    background: {
      default: '#f8fafc',
      paper: '#ffffff',
    },
    text: {
      primary: '#1a2b3b',
      secondary: '#64748b',
    },
    divider: 'rgba(0,0,0,0.06)',
  },
  typography: {
    fontFamily: 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif',
    h1: {
      fontWeight: 600,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontWeight: 600,
      letterSpacing: '-0.02em',
    },
    h3: {
      fontWeight: 600,
      letterSpacing: '-0.02em',
    },
    h4: {
      fontWeight: 600,
      letterSpacing: '-0.01em',
    },
    h5: {
      fontWeight: 600,
      letterSpacing: '-0.01em',
    },
    h6: {
      fontWeight: 600,
      letterSpacing: '-0.01em',
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 8,
  },
  shadows: [
    'none',
    '0 1px 2px rgba(0,0,0,0.05)',
    '0 1px 3px rgba(0,0,0,0.1)',
    '0 2px 4px rgba(0,0,0,0.1)',
    '0 4px 6px rgba(0,0,0,0.1)',
    '0 8px 8px rgba(0,0,0,0.1)',
    '0 12px 12px rgba(0,0,0,0.1)',
    '0 16px 16px rgba(0,0,0,0.1)',
    '0 20px 20px rgba(0,0,0,0.1)',
    '0 24px 24px rgba(0,0,0,0.1)',
    '0 28px 28px rgba(0,0,0,0.1)',
    '0 32px 32px rgba(0,0,0,0.1)',
    '0 36px 36px rgba(0,0,0,0.1)',
    '0 40px 40px rgba(0,0,0,0.1)',
    '0 44px 44px rgba(0,0,0,0.1)',
    '0 48px 48px rgba(0,0,0,0.1)',
    '0 52px 52px rgba(0,0,0,0.1)',
    '0 56px 56px rgba(0,0,0,0.1)',
    '0 60px 60px rgba(0,0,0,0.1)',
    '0 64px 64px rgba(0,0,0,0.1)',
    '0 68px 68px rgba(0,0,0,0.1)',
    '0 72px 72px rgba(0,0,0,0.1)',
    '0 76px 76px rgba(0,0,0,0.1)',
    '0 80px 80px rgba(0,0,0,0.1)',
    '0 84px 84px rgba(0,0,0,0.1)',
  ],
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 500,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <MainLayout>
          <Routes>
            <Route path="/" element={<Navigate to="/api-usage" replace />} />
            <Route path="/api-usage" element={<ApiUsagePage />} />
            <Route path="/api-keys" element={<ApiKeysPage />} />
            <Route path="/api-documentation" element={<ApiDocumentationPage />} />
            <Route path="/ocr-analyzer" element={<OcrAnalyzerPage />} />
          </Routes>
        </MainLayout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
