import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    dedupe: ['@ag-grid-community/core']
  },
  test: {
        environment: 'jsdom',
        setupFiles: ['./tests/setup.ts'],
        testMatch: ['./tests/**/*.test.tsx'],
        globals: true
      }
})
