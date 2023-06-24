import { access } from 'node:fs';
import { OperationFailMsg } from './files/constants.js';
import { saveHomeDir, workingDirectoryPath } from '../utils/homedir.js';

export const goUpper = () => {
  const root = '/';
  const separator = workingDirectoryPath.includes('/') ? '/' : '\\';
  let newPath = workingDirectoryPath.split(separator);
  newPath.pop();
  newPath = newPath.length === 1 ? root : newPath.join(separator);

  access(newPath, (err) => {
    if (err) {
      console.error(OperationFailMsg);
    } else {
      process.chdir(newPath);
      saveHomeDir(newPath);
    }
  });

}
