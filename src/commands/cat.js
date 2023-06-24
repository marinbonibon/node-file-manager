import { createReadStream } from 'node:fs';
import { OperationFailMsg } from './files/constants.js';

export const readFile = async (filePath) => {
  const stream = createReadStream(filePath);
  stream.on('data', (data) => {
    process.stdout.write(data);
  })
  stream.on('error', () => {
    console.error(OperationFailMsg);
  });
};
