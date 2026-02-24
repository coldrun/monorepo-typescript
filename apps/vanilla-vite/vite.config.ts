import { defineConfig } from 'vite';

const { BASE_URL } = process.env;

export default defineConfig({
  base: BASE_URL || '/',
});
