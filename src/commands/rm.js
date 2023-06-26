import { unlink } from 'node:fs';
import { invalidInputMsg, operationFailMsg } from './files/constants.js';

export const removeFile = async (filePath) => {
  try {
    unlink(filePath, (err) => {
      if (err) console.error(operationFailMsg);
    })
  } catch (err) {
    console.error(invalidInputMsg);
  }
};
