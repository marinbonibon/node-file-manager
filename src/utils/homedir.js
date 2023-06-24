import { homedir } from 'node:os';

export const workingDirectoryPath = homedir();

export const showHomeDir = () => {
  console.log(`You are currently in ${workingDirectoryPath}`);
}
