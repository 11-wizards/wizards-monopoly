import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';
dotenv.config();
import path from 'path';

export default defineConfig(({ command, mode, ssrBuild }) => {
  const baseConfig = {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import 'styles/vars';`,
        },
      },
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
        helpers: path.join(__dirname, './src/helpers'),
        hooks: path.join(__dirname, './src/hooks'),
        layouts: path.join(__dirname, './src/layouts'),
        models: path.join(__dirname, './src/models'),
        pages: path.join(__dirname, './src/pages'),
        styles: path.join(__dirname, './src/styles'),
        translations: path.join(__dirname, './src/translations'),
        types: path.join(__dirname, './src/types'),
        data: path.join(__dirname, './src/data'),
      },
    },
  };

  if (command === 'serve') {
    return {
      ...baseConfig,
      define: {
        __SERVER_PORT__: process.env.SERVER_PORT,
      },
      server: {
        port: Number(process.env.CLIENT_PORT) || 3000,
      },
    };
  } else {
    if (ssrBuild) {
      return {
        ...baseConfig,
        build: {
          lib: {
            entry: path.resolve(__dirname, './src/ssr.tsx'),
            name: 'Client',
            fileName: 'client',
            formats: ['cjs'],
          },
          rollupOptions: {
            input: {
              main: './index.html',
            },
            output: {
              dir: './dist-ssr',
            },
          },
        },
      };
    } else {
      return {
        build: {
          rollupOptions: {
            input: {
              main: './index.html',
            },
            output: {
              dir: './dist',
            },
          },
        },
        ...baseConfig,
      };
    }
  }
});
