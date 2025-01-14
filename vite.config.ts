import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  server: {
    port: 5175
  },
  plugins: [react()],
  build: {
    outDir: 'build',
    chunkSizeWarningLimit: 500,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            return 'vendor'; // Group node_modules into a vendor chunk
          }
        }
      }
    }
  },
  optimizeDeps: {
    include: ['react', 'react-dom'], // Pre-bundle essential dependencies
  }
});
