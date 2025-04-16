import { packageConfig } from '@gewis/aurora-client-vite';

export default {
  ...packageConfig,
  server: {
    fs: {
      strict: false
    }
  }
}