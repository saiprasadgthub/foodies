import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/foodies/', // 👈 This MUST match the repo name
  plugins: [react()],
});
