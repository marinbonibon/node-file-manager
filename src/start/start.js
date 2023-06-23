import { fileURLToPath } from 'url';
import { dirname, join } from 'node:path';
import { writeFile } from 'node:fs';
import { fork } from 'node:child_process';
import { showHomeDir } from '../utils/homedir.js';


const start = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const filePath = join(__dirname, 'files', 'username.js');
  const scriptPath = join(__dirname, 'files', 'script.js');
  const prefix = '--username=';
  const defaultName = 'Stranger';
  const argValue = process.argv.find(arg => arg.startsWith(prefix)).substr(prefix.length);
  const userName = argValue.length ? argValue : defaultName;
  const content = `export const userName = '${userName}';`;
  writeFile(filePath, content, (err) => {
    if (err) {
      console.error(err);
    }
  });

  console.log(`Welcome to the File Manager, ${userName}!`);
  showHomeDir();

  fork(scriptPath);
};

await start();


