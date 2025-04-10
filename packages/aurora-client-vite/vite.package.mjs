import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc';
import { libInjectCss } from 'vite-plugin-lib-inject-css';
import svgr from 'vite-plugin-svgr'

export default defineConfig({
  plugins: [
    react(),
    libInjectCss(),
    svgr()
  ],
  build: {
    outDir: 'lib',
    lib: {
      entry: 'index.ts',
      formats: ['es'],
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'events'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM'
        },
      }
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
      },
    },
  },
})