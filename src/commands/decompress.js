import { createReadStream, createWriteStream } from 'node:fs';
import { pipeline } from 'node:stream';
import { createBrotliDecompress } from 'node:zlib';
import { OperationFailMsg } from './files/constants.js';

export const decompressFile = async (sourcePath, destinationPath) => {
  const readStream = createReadStream(sourcePath);
  const writeStream = createWriteStream(destinationPath);
  const compressStream = createBrotliDecompress();

  pipeline(readStream, compressStream, writeStream, (err) => {
    if (err) {
      console.error(OperationFailMsg);
    }
  });
}
