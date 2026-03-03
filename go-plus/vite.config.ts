import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import AutoImport from 'unplugin-auto-import/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    AutoImport({
      imports: ['vue', 'vue-router', 'pinia'],
      dts: 'src/auto-imports.d.ts',
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  server: {
    port: 5173,
    host: '0.0.0.0',
    proxy: {
      '/api': {
        target: 'http://api:4000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/api'),
        configure: (proxy, options) => {
          proxy.on('proxyReq', (proxyReq, req, res) => {
            Object.keys(req.headers).forEach(key => {
              if (key !== 'host' && key !== 'connection' && key !== 'upgrade' && key !== 'upgrade-insecure-requests') {
                proxyReq.setHeader(key, req.headers[key]!);
              }
            });

            if (req.headers['x-api-key']) {
              proxyReq.setHeader('x-api-key', req.headers['x-api-key']);
            }
          });
        }
      }
    },
    watch: {
      ignored: ['**/node_modules/**'],
      usePolling: true,           
      interval: 10000,            
      binaryInterval: 1000,
      followSymlinks: true
    }
  }
})
