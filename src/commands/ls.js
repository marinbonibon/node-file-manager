import { readdir } from 'node:fs';
import { OperationFailMsg } from './files/constants.js';

export const getList = (folderPath) => {
  return readdir(folderPath, { withFileTypes: true }, (err, files) => {
    if (err) console.error(OperationFailMsg);

    const folderDir = [];
    const folderFiles = [];

    files.forEach((file) => {
      if (file.isFile()) {
        folderFiles.push({name: file.name, type: 'file'});
      } else {
        folderDir.push({name: file.name, type: 'directory'});
      }
    });

    const folderContent = [...folderDir, ...folderFiles];
    console.table(folderContent);
  });
};

