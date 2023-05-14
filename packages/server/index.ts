/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { RootState } from 'client/src/app/store';
import cors from 'cors';
import dotenv from 'dotenv';
import express, { NextFunction, Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import { createServer as createViteServer, type ViteDevServer } from 'vite';
dotenv.config();

const PORT = Number(process.env.SERVER_PORT) || 3001;

const IS_DEV = process.env.NODE_ENV === 'development';

async function startServer() {
  const app = express();
  app.use(cors());

  let vite: ViteDevServer | undefined;

  const distPath = path.dirname(require.resolve('client/dist/index.html'));
  const distSsrPath = require.resolve('client/dist-ssr/ssr.js');
  const srcPath = path.dirname(require.resolve('client'));

  if (IS_DEV) {
    vite = await createViteServer({
      server: { middlewareMode: true },
      root: srcPath,
      appType: 'custom',
    });

    app.use(vite.middlewares);
  }

  if (!IS_DEV) {
    app.use('/assets', express.static(path.resolve(distPath, 'assets')));
  }

  app.use('*', async (req: Request, res: Response, next: NextFunction) => {
    const url = req.originalUrl;

    try {
      let template: string;

      if (!IS_DEV) {
        template = fs.readFileSync(path.resolve(distPath, 'index.html'), 'utf-8');
      } else {
        template = fs.readFileSync(path.resolve(srcPath, 'index.html'), 'utf-8');

        template = await vite!.transformIndexHtml(url, template);
      }

      let render: (url: string) => [RootState, string];

      if (!IS_DEV) {
        render = (await import(distSsrPath)).render;
      } else {
        render = (await vite!.ssrLoadModule(path.resolve(srcPath, 'src/ssr.tsx'))).render;
      }

      const [initialState, appHtml] = render(url);

      const html = template
        .replace(`<!--ssr-outlet-->`, appHtml)
        .replace('<!--preloaded-state-->', JSON.stringify(initialState).replace(/</g, '\\u003c'));

      res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
    } catch (e) {
      if (IS_DEV) {
        vite!.ssrFixStacktrace(e as Error);
      }
      next(e);
    }
  });

  app.listen(PORT, () => {
    console.log(`  ➜ 🎸 Server is listening on port: ${PORT}`);
  });
}

startServer();
