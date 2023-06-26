import { readdir } from 'node:fs';
import { operationFailMsg } from './files/constants.js';

export const getList = async (folderPath) => {
  return readdir(folderPath, { withFileTypes: true }, (err, files) => {
    if (err) console.error(operationFailMsg);

    const folderDir = [];
    const folderFiles = [];

    files.forEach((file) => {
      if (file.isDirectory()) {
        folderDir.push({name: file.name, type: 'directory'});
      } else {
        folderFiles.push({name: file.name, type: 'file'});
      }
    });

    const folderContent = [...folderDir, ...folderFiles];
    console.table(folderContent);
  });
};

