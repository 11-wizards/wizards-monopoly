import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import manifest from '../dist/manifest.json' assert { type: 'json' };

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

console.log('work');

function swBuild() {
  const inputHtmlFilePath = path.join(__dirname, '../no-chache-no-network.html');
  const outputHtmlFilePath = path.join(__dirname, '../dist', 'no-chache-no-network.html');

  const inputSwFilePath = path.join(__dirname, '/sw.js');
  const outputSwFilePath = path.join(__dirname, '../dist', 'sw.js');

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
        const swFileNewContent = verNumber + fileList + swContetn;
        fs.writeFileSync(outputSwFilePath, swFileNewContent);
      }
    });
  } catch (error) {
    console.log('Не удалось сгенерировать файл sw.js! Ошибка: ');
    console.log(error);
  }
}

swBuild();
