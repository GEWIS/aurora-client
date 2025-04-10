import { spaConfig } from '@gewis/aurora-client-vite';

export default {
    ...spaConfig,
    server: {
      ...spaConfig.server,
      watch: {
        ignored: [
          '**/node_modules/**',
          '**/lib/**',
          '!**/aurora.config.tsx',
          '!../packages/**',
        ],
      },
    },
    optimizeDeps: {
      include: ['react', 'react-dom'],
    },
    resolve: {
      dedupe: ['react', 'react-dom']
    },
};
