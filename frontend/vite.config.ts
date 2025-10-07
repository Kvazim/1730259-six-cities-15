/// <reference types='vitest/config' />
/// <reference types='vite/client' />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/app/setupTests.ts'],
  },
  server: {
    host: true,
    port: 5173,
    strictPort: true,
    watch : {
      usePolling: true
    }
  }
});
