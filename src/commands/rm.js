import { unlink } from 'node:fs';
import { operationFailMsg } from './files/constants.js';

export const removeFile = async (filePath) => {
  unlink(filePath, (err) => {
    if (err) console.error(operationFailMsg);
    })
};
