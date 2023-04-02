import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';
dotenv.config();
import path from 'path';
// https://vitejs.dev/config/
export default defineConfig({
  define: {
    __SERVER_PORT__: process.env.SERVER_PORT,
  },
  plugins: [react()],
  resolve: {
    alias: {
      api: path.join(__dirname, './src/api'),
      app: path.join(__dirname, './src/app'),
      components: path.join(__dirname, './src/components'),
      constants: path.join(__dirname, './src/constants'),
      core: path.join(__dirname, './src/core'),
      features: path.join(__dirname, './src/features'),
      game: path.join(__dirname, './src/game'),
      hooks: path.join(__dirname, './src/game'),
      layouts: path.join(__dirname, './src/layouts'),
      models: path.join(__dirname, './src/models'),
      pages: path.join(__dirname, './src/pages'),
      translations: path.join(__dirname, './src/translations'),
      types: path.join(__dirname, './src/types'),
    },
  },
  server: {
    port: Number(process.env.CLIENT_PORT) || 3000,
  },
});
