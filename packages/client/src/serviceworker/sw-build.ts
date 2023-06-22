/* eslint no-restricted-globals: ["error", "event"] */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import config from '../../sw.config.json' assert { type: 'json' };

const { SW_BUILD_FILE, SW_FILE, SW_HTML_FILE, APP_ROOT_PATH, BUILD_DIR } = config;

const filename: string = fileURLToPath(import.meta.url);

const dirname: string = path.dirname(filename);

function swBuild(): void {
  const inputHtmlFilePath: string = path.join(dirname, APP_ROOT_PATH, SW_HTML_FILE);
  const outputHtmlFilePath: string = path.join(dirname, APP_ROOT_PATH, BUILD_DIR, SW_HTML_FILE);
  const manifestFilePath: string = path.join(dirname, APP_ROOT_PATH, BUILD_DIR, 'manifest.json');

  const inputSwFilePath: string = path.join(dirname, SW_FILE);
  const outputSwFilePathBuild: string = path.join(dirname, APP_ROOT_PATH, BUILD_DIR, SW_FILE);
  const outputSwFilePath: string = path.join(dirname, APP_ROOT_PATH, SW_FILE);

  const currentFile: string = path.join(dirname, SW_BUILD_FILE);

  try {
    let manifest = {};

    if (fs.existsSync(manifestFilePath)) {
      const manifestContent = fs.readFileSync(manifestFilePath) ?? ('' as string);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      manifest = JSON.parse(String(manifestContent)) ?? {};
    }

    fs.copyFileSync(inputHtmlFilePath, outputHtmlFilePath);

    fs.readFile(inputSwFilePath, 'utf8', (err, swContetn) => {
      const verNumber = `const currentCachesVersion = ${new Date().getTime()};\n\n`;
      let swFileNewContent = swContetn
        .replace('let currentCachesVersion;', verNumber)
        // .replace('let outputFilesList;', fileList)
        .replace('export {};', '');

      if (!swContetn) return;

      fs.writeFileSync(inputSwFilePath, swFileNewContent);
      fs.copyFileSync(inputSwFilePath, outputSwFilePath);

      let fileList = '';

      Object.values(manifest).forEach((item, key) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const { file } = item as any;
        if (key) {
          fileList += ',';
        }
        fileList += `"/${String(file)}"`;
      });

      if (fileList) {
        fileList = `const outputFilesList =[${fileList}];\n\n`;
        swFileNewContent = swFileNewContent.replace('let outputFilesList;', fileList);
        fs.writeFileSync(inputSwFilePath, swFileNewContent);
      }
      fs.copyFileSync(inputSwFilePath, outputSwFilePathBuild);
      fs.unlinkSync(inputSwFilePath);
      fs.unlinkSync(currentFile);
    });
  } catch (error) {
    console.error('Не удалось сгенерировать файл sw.js! Ошибка: ', error);
  }
}

swBuild();
