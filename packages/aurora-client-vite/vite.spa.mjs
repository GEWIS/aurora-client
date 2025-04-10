import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc';
import svgr from 'vite-plugin-svgr'

export default defineConfig({
  base: '/',
  plugins: [
    react(),
    svgr()
  ],
  server: {
    host: '0.0.0.0',
    port: 8081,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
        ws: true,
      },
      '/socket.io': {
        target: 'ws://localhost:3000',
        ws: true,
      },
      '/static/posters': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
      },
      '/static/local-posters': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  build: {
    outDir: './dist',
    chunkSizeWarningLimit: 750,
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
      },
    },
  },
  publicDir: './public',
});