import { copyFile } from './cp.js';
import { removeFile } from './rm.js';

export const moveFile = async (sourcePath, destinationPath) => {
  await copyFile(sourcePath, destinationPath);
  await removeFile(sourcePath);
}
