import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  base: '/',
  plugins: [react()],
  server: {
    port: 8081,
    proxy: {
      "/api": {
        target: "http://localhost:3000",
      }
    }
  },
  build: {
    outDir: './build'
  },
})
