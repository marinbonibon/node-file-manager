import { writeFile } from 'node:fs';
import { invalidInputMsg, operationFailMsg } from './files/constants.js';

export const addFile = async (path) => {
  try {
    writeFile(path, '', { flag: 'wx'}, (err) => {
      if (err) console.error(operationFailMsg);
    })
  } catch (err) {
    console.error(invalidInputMsg);
  }
}
