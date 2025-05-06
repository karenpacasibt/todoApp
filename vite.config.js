import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@styles': path.resolve(__dirname, 'src/stylesheets'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@tasks': path.resolve(__dirname, 'src/components/pages/tasks'),
      '@tags': path.resolve(__dirname, 'src/components/pages/tags'),
      '@services': path.resolve(__dirname, 'src/services'),
    },
  }
})
