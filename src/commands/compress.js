import { createReadStream, createWriteStream } from 'node:fs';
import { pipeline } from 'node:stream';
import { createBrotliCompress } from 'node:zlib';
import { operationFailMsg } from './files/constants.js';

export const compressFile = async (sourcePath, destinationPath) => {
  const readStream = createReadStream(sourcePath);
  const writeStream = createWriteStream(destinationPath);
  const compressStream = createBrotliCompress();

  pipeline(readStream, compressStream, writeStream, (err) => {
    if (err) {
      console.error(operationFailMsg);
    }
  });
}
