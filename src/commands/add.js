import { writeFile } from 'node:fs';
import { operationFailMsg } from './files/constants.js';

export const addFile = async (path) => {
  writeFile(path, '', { flag: 'wx'}, (err) => {
    if (err) console.error(operationFailMsg)
  })
}
