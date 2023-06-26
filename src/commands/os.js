import { cpus } from 'node:os';
import { OperationFailMsg } from './files/constants.js';

const getCpus = () => {
  const cpusArr = cpus().map((cpu) => cpu.model);
  console.log(`Overall amount of CPUS: ${cpusArr.length}`);
  console.log(cpusArr);
};

export const getOsInfo = async (arg) => {
  const prefix = '--';
  const argText = arg.substring(prefix.length).trim();
  switch (argText) {
    case 'cpus':
      getCpus();
      break;
    default:
      console.log(OperationFailMsg);
  }
};
