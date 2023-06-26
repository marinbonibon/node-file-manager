import { createReadStream, createWriteStream } from 'node:fs';
import { pipeline } from 'node:stream';
import { createBrotliDecompress } from 'node:zlib';
import { invalidInputMsg, operationFailMsg } from './files/constants.js';

export const decompressFile = async (sourcePath, destinationPath) => {
  try {
    const source = sourcePath || '';
    const destination = destinationPath || '';
    const readStream = createReadStream(source);
    const writeStream = createWriteStream(destination);
    const compressStream = createBrotliDecompress();
    pipeline(readStream, compressStream, writeStream, (err) => {
      if (err) {
        console.error(invalidInputMsg);
      }
    });
  } catch (err) {
    console.error(operationFailMsg);
  }
}
