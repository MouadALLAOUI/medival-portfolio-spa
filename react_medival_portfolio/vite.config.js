import { defineConfig } from 'vite';
import react, { reactCompilerPreset } from '@vitejs/plugin-react';
import babel from '@rolldown/plugin-babel';
import { visualizer } from 'rollup-plugin-visualizer';

/** @type {import('vite').Plugin} */
const prismLanguagePlugin = {
  name: 'inject-prism-import',
  enforce: 'pre',
  transform(code, id) {
    if (id.includes('/prismjs/components/prism-') && !id.includes('prism-core')) {
      return { code: `import Prism from 'prismjs';\n${code}`, map: null };
    }
    return null;
  },
};

export default defineConfig({
  base: './',
  plugins: [
    prismLanguagePlugin,
    react(),
    babel({ presets: [reactCompilerPreset()] }),
    visualizer({
      open: false,
      filename: 'bundle-stats.html',
      gzipSize: true,
      brotliSize: true,
    })
  ],
  optimizeDeps: {
    include: [
      'prismjs',
      'prismjs/components/prism-javascript',
      'prismjs/components/prism-css',
      'prismjs/components/prism-python',
      'prismjs/components/prism-markdown',
      'prismjs/components/prism-json',
      'prismjs/components/prism-bash',
    ],
  },
  build: {
    sourcemap: false,
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (
              id.includes('react/') ||
              id.includes('react-dom/') ||
              id.includes('react-router-dom/') ||
              id.includes('framer-motion/')
            ) {
              return 'vendor';
            }
            if (id.includes('lucide-react/')) {
              return 'icons';
            }
            return 'vendor-libs';
          }
        },
      },
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        silenceDeprecations: ['import'],
      },
    },
  },
});
