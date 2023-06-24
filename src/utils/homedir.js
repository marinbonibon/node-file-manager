import { homedir } from 'node:os';

export let workingDirectoryPath = homedir();

export const saveHomeDir = (path) => {
  console.log('path', path);
  workingDirectoryPath = path;
  return workingDirectoryPath;
}

export const showHomeDir = () => {
  console.log(`You are currently in ${workingDirectoryPath}`);
}
