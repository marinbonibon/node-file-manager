import { createReadStream } from 'node:fs';
import { invalidInputMsg, operationFailMsg } from './files/constants.js';

export const readFile = async (filePath) => {
 try {
   const stream = createReadStream(filePath);
   stream.on('data', (data) => {
     process.stdout.write(data);
   })
   stream.on('error', () => {
     console.error(operationFailMsg);
   });
 } catch (err) {
   console.error(invalidInputMsg);
 }
};
