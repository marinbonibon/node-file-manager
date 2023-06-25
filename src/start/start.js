import { fileURLToPath } from 'url';
import { dirname, join } from 'node:path';
import { writeFile } from 'node:fs';
import { showHomeDir, workingDirectoryPath } from '../utils/homedir.js';
import { stdin } from 'node:process';
import { exitProgram } from '../utils/exit.js';
import { getList } from '../commands/ls.js';
import { changeDir } from '../commands/cd.js';
import { goUpper } from '../commands/up.js';
import { addFile } from '../commands/add.js';
import { readFile } from '../commands/cat.js';
import { renameFile } from '../commands/rn.js';
import { removeFile } from '../commands/rm.js';
import { copyFile } from '../commands/cp.js';

const start = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const filePath = join(__dirname, 'files', 'username.js');
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

  process.on('SIGINT', () => {
    exitProgram(userName);
  });

  process.on('close', () => {
    exitProgram(userName);
  });

  stdin.on('data', async (data) => {
    const currentCommandArray = data.toString().trim().split(' ');
    const [command, source, destination] = currentCommandArray;

    if (command.includes('.exit')) {
      exitProgram(userName);
      return;
    }
    switch (command) {
      case 'ls':
        await getList(workingDirectoryPath);
        break;
      case 'cd':
        await changeDir(workingDirectoryPath, source);
        break;
      case 'up':
        await goUpper();
        break;
      case 'add':
        await addFile(source);
        break;
      case 'cat':
        await readFile(source);
        break;
      case 'rn':
        await renameFile(workingDirectoryPath, source, destination);
        break;
      case 'rm':
        await removeFile(source);
        break;
      case 'cp':
        await copyFile(source, destination); // f.ex.: cp test.txt my_folder/test.txt
        break;
      default:
        console.log('Invalid input');
    }
    setTimeout(showHomeDir, 100);
  });
};

await start();


