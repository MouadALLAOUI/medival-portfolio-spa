import { defineConfig } from 'vite';
import react, { reactCompilerPreset } from '@vitejs/plugin-react';
import babel from '@rolldown/plugin-babel';

export default defineConfig({
  // Base path:
  // '/' for custom domain (mouadthecoder.com) or Netlify/Vercel subdomain
  // '/repo-name/' for GitHub Pages subdirectory deployment
  base: '/',

  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] }),

    visualizer({
      open: false,
      filename: 'bundle-stats.html',
      gzipSize: true,
      brotliSize: true,
    }),
  ],

  build: {
    outDir: 'dist',
    sourcemap: false,     // disabled for production — smaller bundle
    minify: 'terser',     // better minification than esbuild default
    rollupOptions: {
      output: {
        // Split large dependencies into separate cacheable chunks.
        // Function form is required by Vite 8 / rolldown (object form is not supported).
        manualChunks(id) {
          if (id.includes('node_modules/react-pdf') || id.includes('node_modules/pdfjs-dist')) {
            return 'vendor-pdf';
          }
          if (
            id.includes('node_modules/react/') ||
            id.includes('node_modules/react-dom/') ||
            id.includes('node_modules/react-router-dom/')
          ) {
            return 'vendor-react';
          }
        },
      },
    },
    // Warn when individual chunks exceed 500 KB
    chunkSizeWarningLimit: 500,
  },
  css: {
    preprocessorOptions: {
      scss: {},
    },
  },
});
