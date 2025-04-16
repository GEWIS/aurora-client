import { client } from './src/client.gen';

export * from './src';

client.setConfig({
  baseUrl: '/api',
});

export { client };
