const path = require('path');
const fs = require('fs');
const  copyDir = require('../04-copy-directory/index.js');
const mergeStyles = require('../05-merge-styles/index.js');

const mkdir = (dst) => {
  fs.mkdir(dst, { recursive: true }, (err) => {
    if (err) {
      throw err;
    }
    copyDir(srcAssetsDir, dstAssetsDir);
  });
};

const dstDir = path.join(__dirname, 'project-dist');
const stylesDir = path.join(__dirname, 'styles');
const cssBundle = path.join(dstDir, 'style.css');
const srcAssetsDir = path.join(__dirname, 'assets');
const dstAssetsDir = path.join(dstDir, 'assets');
const componenstDir = path.join(__dirname, 'components');
const html = path.join(dstDir, 'index.html');
const template = path.join(__dirname, 'template.html');

mkdir(dstDir);

mergeStyles(stylesDir, cssBundle);

const readComponentFile = (filePath) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf-8', (err, dataFile) => {
      if (err) {
        reject(err);
      } else {
        resolve(dataFile);
      }
    });
  });
};

fs.readdir(componenstDir, (err, data) => {
  if (err) {
    throw err;
  }
  
  const componentDataPromises = data.map((fileName) => {
    const [ name ] = fileName.split('.');
    const filePath = path.join(componenstDir, fileName);
    return readComponentFile(filePath)
      .then((dataFile) => ({ name, data: dataFile }));
  });

  Promise.all(componentDataPromises)
    .then((results) => {
      fs.readFile(template, 'utf-8', (err, code) => {
        if (err) throw err;
        let editedHtml = code;
        results.forEach(({name, data}) => {
          editedHtml = editedHtml.replace(new RegExp(`{{${name}}}`), data);
        });

        fs.writeFile(html, editedHtml, (err) => {
          if (err) {
            throw err;
          }
        });
      });
    })
    .catch((err) => {
      console.error(err);
    });
});
