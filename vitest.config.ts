import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'node:path';

export default defineConfig({
  plugins: [
    react(),
    // Match next.config.ts's Turbopack raw-loader rule for markdown.
    // Vitest uses Vite (not Turbopack), so we re-implement it here.
    {
      name: 'md-raw-loader',
      transform(code: string, id: string) {
        if (!id.endsWith('.md')) return null;
        return { code: `export default ${JSON.stringify(code)};`, map: null };
      },
    },
  ],
  test: {
    // Default to node because renderToString (server-side) doesn't need a DOM
    // and happy-dom's polyfilled Request/Headers break NextRequest cookie
    // parsing. Tests that need a real DOM (e.g. @testing-library/react render)
    // can opt in per-file via the directive: // @vitest-environment happy-dom
    environment: 'node',
    globals: false,
    include: ['**/*.test.ts', '**/*.test.tsx'],
    exclude: ['node_modules', '.next', '.open-next'],
  },
  resolve: {
    alias: { '@': path.resolve(__dirname, '.') },
  },
});
