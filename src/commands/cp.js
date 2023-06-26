import { createReadStream, createWriteStream } from 'node:fs';
import { operationFailMsg } from './files/constants.js';

export const copyFile = async (sourcePath, destinationPath) => {
  const readStream = createReadStream(sourcePath);
  const writeStream = createWriteStream(destinationPath);

  readStream.pipe(writeStream);

  readStream.on('error', () => {
    console.error(operationFailMsg);
  });

  writeStream.on('error', () => {
    console.error(operationFailMsg);
  });
}
