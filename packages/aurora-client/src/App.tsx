import './index.css';
import { BrowserRouter } from 'react-router-dom';
import AuthContextProvider from './contexts/AuthContext';
import ErrorBoundary from './ErrorBoundary';
import { client } from './api/client.gen';
import ClientView from './ClientView';
export default function App() {
  client.setConfig({
    baseUrl: '/api',
  });

  return (
    <ErrorBoundary>
      <BrowserRouter>
        <AuthContextProvider>
          <ClientView />
        </AuthContextProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
}
