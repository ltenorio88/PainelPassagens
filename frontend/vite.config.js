import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  root: '.', // garante que index.html seja resolvido corretamente
  build: {
    outDir: 'dist',
  },
});
