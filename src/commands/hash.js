import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { access } from 'node:fs';
import { invalidInputMsg, operationFailMsg } from './files/constants.js';

export const calcHash = async (filePath) => {
  try {
    access(filePath, async (err) => {
      if (err) {
        console.error(operationFailMsg);
      } else {
        const fileBuffer = await readFile(filePath).then(data => data);
        const hex = createHash('sha256').update(fileBuffer).digest('hex');

        console.log(`SHA256 hash for file: ${hex}`);
      }
    });
  } catch (err) {
    console.error(invalidInputMsg);
  }
};
