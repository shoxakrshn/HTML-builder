const path = require('path');
const fs = require('fs');

const srcFolderPath = path.join(__dirname, 'files');
const dstFolderPath = path.join(__dirname, 'files-copy');

const remove = (dstDir, data) => {
  fs.readdir(dstDir, (err, dstData) => {
    if (err) {
      throw err;
    }
    const last = dstData.filter((file) => !data.includes(file));
    if (last.length) {
      last.forEach((file) => {
        const pathFile = path.join(dstDir, file);
        fs.rm(pathFile, { force: true, recursive: true }, (err) => {
          if (err) {
            throw err;
          }
        });
      });
    }
  });
};

const copyDir = (srcDir, dstDir) => {
  fs.mkdir(dstDir, { recursive: true }, (err) => {
    if (err) {
      throw err;
    }
  });

  fs.readdir(srcDir, (err, data) => {
    if (err) {
      throw err;
    }

    //copy files
    data.forEach((fileName) => {
      const srcFilePath = path.join(srcDir, fileName);
      const dstFilePath = path.join(dstDir, fileName);
      fs.stat(srcFilePath, (err, dataStat) => {
        if (err) {
          throw err;
        }
        if (dataStat.isDirectory()) {
          copyDir(srcFilePath, dstFilePath);
        } else {
          fs.copyFile(srcFilePath, dstFilePath, (err) => {
            if (err) {
              throw err;
            }
          });
        }
      });
    });
    remove(dstDir, data);
  });
};


copyDir(srcFolderPath, dstFolderPath);

/*
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
*/
