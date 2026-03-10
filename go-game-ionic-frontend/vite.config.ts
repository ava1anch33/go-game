/// <reference types="vitest" />

import legacy from '@vitejs/plugin-legacy'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    legacy()
  ],
  server: {
    host: true,
    port: 8100,
    strictPort: true,
    proxy: {
      '/api': {
        target: 'http://localhost:4000',
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
    },
    hmr: {
      clientPort: 8100
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom'
  }
})
