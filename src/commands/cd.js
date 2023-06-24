import { join, isAbsolute } from 'node:path';
import { access } from 'node:fs';
import { saveHomeDir } from '../utils/homedir.js';

export const cd = (workingDirectoryPath, directory) => {
  const folderPath = isAbsolute(directory) ? directory : join(workingDirectoryPath, directory);

  access(folderPath, (err) => {
    if (err) {
      console.error(`Directory '${directory}' does not exist.`);
    } else {
      process.chdir(folderPath);
      saveHomeDir(folderPath);
    }
  });
}
