import './index.css';
import { BrowserRouter } from 'react-router-dom';
import AuthContextProvider from './contexts/AuthContext';
import HandlerSwitcher from './HandlerSwitcher';
import ErrorBoundary from './ErrorBoundary';

export default function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <AuthContextProvider>
          <HandlerSwitcher />
        </AuthContextProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
}
