import { createReadStream, createWriteStream } from 'node:fs';
import { invalidInputMsg, operationFailMsg } from './files/constants.js';

export const copyFile = async (sourcePath, destinationPath) => {
  const source = sourcePath || '';
  const destination = destinationPath || '';
  const readStream = createReadStream(source);
  const writeStream = createWriteStream(destination);

  readStream.pipe(writeStream);

  readStream.on('error', () => {
    if (!sourcePath) {
      console.error(invalidInputMsg);
    } else {
      console.error(operationFailMsg);
    }
  });

  writeStream.on('error', () => {
    if (!destinationPath) {
      console.error(invalidInputMsg);
    } else {
      console.error(operationFailMsg);
    }
  });
};
