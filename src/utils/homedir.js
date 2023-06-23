import { homedir } from 'node:os';

export const showHomeDir = () => {
  const workingDirectoryPath = homedir();
  console.log(`You are currently in ${workingDirectoryPath}`);
}
