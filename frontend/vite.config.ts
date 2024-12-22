import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  build: {
    target: 'es2022',  
    outDir: 'dist',
  },
  server: {
    port: 3000,
  },
})
