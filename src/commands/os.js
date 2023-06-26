import { cpus, EOL, homedir, userInfo } from 'node:os';
import { arch } from 'node:process';
import { OperationFailMsg } from './files/constants.js';

const getCpus = () => {
  const cpusArr = cpus().map((cpu) => cpu.model);
  console.log(`Overall amount of CPUS: ${cpusArr.length}`);
  console.log(cpusArr);
};

const getUserName = () => {
  const userName = userInfo().username;
  console.log('userName', userName);
};

export const getOsInfo = async (arg) => {
  const prefix = '--';
  const argText = arg.substring(prefix.length).trim();
  switch (argText) {
    case 'cpus':
      getCpus();
      break;
    case 'EOL':
      console.log(JSON.stringify(EOL));
      break;
      case 'homedir':
      console.log(homedir());
      break;
    case 'username':
      getUserName();
      break;
    case 'architecture':
      console.log(arch);
      break;
    default:
      console.log(OperationFailMsg);
  }
};
