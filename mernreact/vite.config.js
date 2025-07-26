// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/foodies/',  // This MUST exactly match your repo name
  plugins: [react()],
});

