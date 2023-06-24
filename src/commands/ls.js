import { readdir } from 'node:fs';

export const getList = (folderPath) => {
  return readdir(folderPath, { withFileTypes: true }, (err, files) => {
    if (err) console.error(err);

    const folderContent = [];

    files.forEach((file) => {
      if (file.isFile()) {
        folderContent.push({name: file.name, type: 'file'});
      } else {
        folderContent.push({name: file.name, type: 'directory'});
      }
    });

    console.table(folderContent);
  });
};

