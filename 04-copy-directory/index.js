const path = require('path');
const fs = require('fs');

const srcFolderPath = path.join(__dirname, 'files');
const dstFolderPath = path.join(__dirname, 'files-copy');


fs.mkdir(dstFolderPath, { recursive: true }, (err) =>  {
  if (err) {
    throw err;
  }
});

fs.readdir(srcFolderPath, (err, data) => {
  if (err) {
    throw err;
  }
  
  //copy files
  data.forEach((fileName) => {
    const srcFilePath = path.join(srcFolderPath, fileName);
    const dstFilePath = path.join(dstFolderPath, fileName);
    fs.copyFile(srcFilePath, dstFilePath, (err) => {
      if (err) {
        throw err;
      }
    })
  })

  //remove not existing files in dst folder
  fs.readdir(dstFolderPath, (err, dstData) => {
    if (err) {
      throw err;
    }
    const last = dstData.filter((file) => !data.includes(file));
    if (last.length) {
      last.forEach((file) => {
        const pathFile = path.join(dstFolderPath, file);
        fs.rm(pathFile, (err) => {
          if (err) {
            throw err;
          }
        });
      })
    }
  });
});
