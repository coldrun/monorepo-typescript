import { defineConfig } from 'vite';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      formats: ['es'],
      fileName: 'index',
    },
  },
  resolve: {
    alias: {
      '~src': resolve('src/'),
    },
  },
  plugins: [dts()],
});
