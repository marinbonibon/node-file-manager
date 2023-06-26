import { invalidInputMsg, operationFailMsg } from './files/constants.js';
import { join } from 'node:path';
import { rename } from 'node:fs';

export const renameFile = async (workingDirectoryPath, oldName, newName) => {
  try {
    const oldPath = join(workingDirectoryPath, oldName);
    const newPath = join(workingDirectoryPath, newName);
    await rename(oldPath, newPath, (err) => {
      if (err) console.error(operationFailMsg);
    });
  } catch (err) {
    console.error(invalidInputMsg);
  }
}
