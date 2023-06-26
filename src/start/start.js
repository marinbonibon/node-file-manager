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
import { moveFile } from '../commands/mv.js';
import { compressFile } from '../commands/compress.js';
import { decompressFile } from '../commands/decompress.js';
import { calcHash } from '../commands/hash.js';
import { getOsInfo } from '../commands/os.js';
import { invalidInputMsg, operationFailMsg } from '../commands/files/constants.js';

const start = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const filePath = join(__dirname, 'files', 'username.js');
  const prefix = '--username=';
  const defaultName = 'Stranger';

  const userName = process.argv.slice(2).find(arg => {
    if (arg.startsWith(prefix)) {
      return arg;
    } else {
      console.error(invalidInputMsg);
    }
  })?.substr(prefix.length) || defaultName;
  const content = `export const userName = '${userName}';`;

  writeFile(filePath, content, (err) => {
    if (err) {
      console.error(operationFailMsg);
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
    let currentCommandArray;

    if (currentCommand.includes('"')) {
      currentCommandArray = currentCommand.split('"');
    } else {
      currentCommandArray = currentCommand.split(' ');
    }
    currentCommandArray = currentCommandArray.filter((val) => val !== ' ');
    let [command, source, destination] = currentCommandArray;
    command = command.trim();
    source = source?.trim();
    destination = destination?.trim();


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
      case 'mv':
        await moveFile(source, destination); // f.ex.: mv test.txt my_folder/test.txt
        break;
      case 'compress':
        await compressFile(source, destination); // f.ex.: compress test.txt archive.br
        break;
      case 'decompress':
        await decompressFile(source, destination); // f.ex.: decompress archive.br test.txt
        break;
      case 'hash':
        await calcHash(source);
        break;
      case 'os':
        await getOsInfo(source);
        break;
      default:
        console.error(invalidInputMsg);
    }
    setTimeout(showHomeDir, 100);
  });
};

await start();
