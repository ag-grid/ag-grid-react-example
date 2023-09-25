import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    // for ag-grid local dev only - not necessary if not using symlinks
    preserveSymlinks: true,
    dedupe: ['ag-grid-community']
  }
})
