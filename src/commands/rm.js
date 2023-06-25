import { unlink } from 'node:fs';
import { OperationFailMsg } from './files/constants.js';

export const removeFile = async (filePath) => {
  unlink(filePath, (err) => {
    if (err) console.error(OperationFailMsg);
    })
};
