import { writeFile } from 'node:fs';
import { OperationFailMsg } from './files/constants.js';

export const addFile = async (path) => {
  writeFile(path, '', { flag: 'wx'}, (err) => {
    if (err) console.error(OperationFailMsg)
  })
}
