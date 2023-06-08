/* eslint-disable @typescript-eslint/no-non-null-assertion */
import cors from 'cors';
import dotenv from 'dotenv';
import express, { NextFunction, Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import { createServer as createViteServer, type ViteDevServer } from 'vite';
import { ROUTER_API_PATH } from './constant';
// import { router } from './routers/api.router';

// TODO: path aliases
import { createClientAndConnect } from './db';
import { router } from './routes';

dotenv.config();

const PORT = Number(process.env.SERVER_PORT) || 3001;

const IS_DEV = process.env.NODE_ENV === 'development';

async function startServer() {
  const app = express();
  app.use(cors());
  app.use(express.json());

  await createClientAndConnect();

  let vite: ViteDevServer | undefined;

  const pathPrefix = IS_DEV ? '' : `${__dirname}/`;

  const distPath = path.dirname(
    require.resolve(path.join(pathPrefix, 'client/dist/index-ssr.html')),
  );
  const distSsrPath = require.resolve(path.join(pathPrefix, 'client/dist-ssr/ssr.cjs'));
  const srcPath = path.dirname(IS_DEV ? require.resolve('client') : __dirname + '/client');

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

  app.use(ROUTER_API_PATH, router);

  app.use('*', async (req: Request, res: Response, next: NextFunction) => {
    const url = req.originalUrl;

    try {
      let template: string;

      if (!IS_DEV) {
        template = fs.readFileSync(path.resolve(distPath, 'index-ssr.html'), 'utf-8');
      } else {
        template = fs.readFileSync(path.resolve(srcPath, 'index-ssr.html'), 'utf-8');

        template = await vite!.transformIndexHtml(url, template);
      }

      // вот тут костыль типа, ибо не получается адекватно импортировать RootState
      let render: (url: string) => Promise<[unknown, string]>;

      if (!IS_DEV) {
        render = (await import(distSsrPath)).render;
      } else {
        render = (await vite!.ssrLoadModule(path.resolve(srcPath, 'src/ssr.tsx'))).render;
      }

      const [initialState, appHtml] = await render(url);

      const html = template
        .replace('<!--ssr-outlet-->', appHtml)
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
