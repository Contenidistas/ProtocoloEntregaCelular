import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  base: process.env.GITHUB_ACTIONS ? '/ProtocoloEntregaCelular/' : '/',
  plugins: [react()],
  server: {
    host: true, // Listen on all local IPs (IPv4 and IPv6)
    port: 3000,
    open: false,
    watch: {
      ignored: ['**/public/videos/**', '**/public/documentos/**']
    }
  }
});
