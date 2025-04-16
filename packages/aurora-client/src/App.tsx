import './index.scss';
import { BrowserRouter } from 'react-router-dom';
import { client } from '@gewis/aurora-client-api';
import AuthContextProvider from './contexts/AuthContext';
import ErrorBoundary from './ErrorBoundary';
import ClientView from './ClientView';
import { HandlerPlugin } from './HandlerSwitcher';

interface Props {
  handlers: HandlerPlugin[];
}

export default function App({ handlers }: Props) {
  client.setConfig({
    baseUrl: '/api',
  });

  return (
    <ErrorBoundary>
      <BrowserRouter>
        <AuthContextProvider>
          <ClientView handlers={handlers} />
        </AuthContextProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
}
