import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { exec } from 'child_process';

import config from '../sw.config.json' assert { type: 'json' };
import manifest from '../dist/manifest.json' assert { type: 'json' };

const { SW_BUILD_FILE, SW_FILE, SW_HTML_FILE } = config;

const __filename: string = fileURLToPath(import.meta.url);

const __dirname: string = path.dirname(__filename);

function swBuild(): void {
  const inputHtmlFilePath: string = path.join(__dirname, '../', SW_HTML_FILE);
  const outputHtmlFilePath: string = path.join(__dirname, '../dist', SW_HTML_FILE);

  const inputSwFilePath: string = path.join(__dirname, SW_FILE);
  const outputSwFilePath: string = path.join(__dirname, '../dist', SW_FILE);

  const currentFile: string = path.join(__dirname, SW_BUILD_FILE);

  try {
    fs.copyFileSync(inputHtmlFilePath, outputHtmlFilePath);

    fs.copyFileSync(inputSwFilePath, outputSwFilePath);

    fs.readFile('./dist/sw.js', 'utf8', (err, swContetn) => {
      const verNumber = `const currentCachesVersion = ${new Date().getTime()};\n\n`;

      if (!swContetn || !manifest) return;
      let fileList = '';

      Object.values(manifest).forEach(({ file }, key) => {
        if (key) {
          fileList += ',';
        }
        fileList += `"/${file}"`;
      });

      if (fileList) {
        fileList = `const outputFilesList =[${fileList}];\n\n`;
        const swFileNewContent = swContetn
          .replace('let outputFilesList, currentCachesVersion;', verNumber + fileList)
          .replace('export {};', '');
        fs.writeFileSync(outputSwFilePath, swFileNewContent);
        fs.unlinkSync(inputSwFilePath);
        fs.unlinkSync(currentFile);
      }
    });
  } catch (error) {
    console.error('Не удалось сгенерировать файл sw.js! Ошибка: ', error);
  }
}

swBuild();
