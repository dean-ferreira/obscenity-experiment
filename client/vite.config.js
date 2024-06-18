import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/blacklist': {
        target: 'http://172.17.0.3:3000', // Replace with your backend server URL
        changeOrigin: true,
        secure: false,
      },
    },
  },
});