import { access } from 'node:fs';
import { operationFailMsg } from './files/constants.js';
import { saveHomeDir, workingDirectoryPath } from '../utils/homedir.js';

export const goUpper = async () => {
  const root = '/';
  const separator = workingDirectoryPath.includes('/') ? '/' : '\\';
  let newPath = workingDirectoryPath.split(separator);
  newPath.pop();
  newPath = newPath.length === 1 ? root : newPath.join(separator);

  access(newPath, (err) => {
    if (err) {
      console.error(operationFailMsg);
    } else {
      process.chdir(newPath);
      saveHomeDir(newPath);
    }
  });

}
