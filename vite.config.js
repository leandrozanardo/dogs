import { defineConfig, transformWithEsbuild } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

/** GitHub Pages: set VITE_BASE_PATH=/dogs/ in CI */
const base = process.env.VITE_BASE_PATH || '/';

export default defineConfig({
  base,
  plugins: [
    {
      name: 'treat-js-files-as-jsx',
      async transform(code, id) {
        if (!id.includes('src') || !id.endsWith('.js')) return null;
        return transformWithEsbuild(code, id, {
          loader: 'jsx',
          jsx: 'automatic',
        });
      },
    },
    react(),
    svgr(),
  ],
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        '.js': 'jsx',
      },
    },
  },
});
