import { join, isAbsolute } from 'node:path';
import { access } from 'node:fs';
import { saveHomeDir } from '../utils/homedir.js';
import { operationFailMsg } from './files/constants.js';

export const changeDir = async (workingDirectoryPath, directory) => {
  const folderPath = isAbsolute(directory) ? directory : join(workingDirectoryPath, directory);

  access(folderPath, (err) => {
    if (err) {
      console.error(operationFailMsg);
    } else {
      process.chdir(folderPath);
      saveHomeDir(folderPath);
    }
  });
}
