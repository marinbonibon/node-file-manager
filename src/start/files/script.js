import { userName } from './username.js';
import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

const exitProgram = () => {
  const exitMsg = `Thank you for using File Manager, ${userName}, goodbye!`;
  console.log(exitMsg);
  process.exit();
};

const closeFileManager = (chunk) => {
  const chunkStringified = chunk.toString();

  if (chunkStringified.includes('.exit')) {
    exitProgram();
  }

  const rl = readline.createInterface({ input, output });

  rl.on('SIGINT', () => {
    exitProgram();
  });

  return chunk;
};

process.stdin.on('data', closeFileManager);


