import { fileURLToPath } from 'url';
import { dirname, join } from 'node:path';
import { writeFile } from 'node:fs';
import { showHomeDir, workingDirectoryPath } from '../utils/homedir.js';
import { stdin } from 'node:process';
import { exitProgram } from '../utils/exit.js';
import { getList } from '../commands/ls.js';

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
    const currentCommand = data.toString().trim();

    if (currentCommand.includes('.exit')) {
      exitProgram(userName);
      return;
    }
    switch (currentCommand) {
      case 'ls':
        getList(workingDirectoryPath);
        break;
      default:
        console.log('Invalid input');
    }
    setTimeout(showHomeDir, 100);
  })
};

await start();


