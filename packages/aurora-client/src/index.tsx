import { createRoot } from 'react-dom/client';
import { HandlerPlugin } from '@gewis/aurora-client-util';
import App from './App';

interface ClientConfig {
  handlers: HandlerPlugin[];
}

export function defineConfig(config: ClientConfig) {
  const root = createRoot(document.getElementById('root') as HTMLElement);
  root.render(<App handlers={config.handlers} />);
}
