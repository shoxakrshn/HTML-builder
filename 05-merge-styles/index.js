const path = require('path');
const fs = require('fs');

const stylesPath = path.join(__dirname, 'styles');
const cssBundle = path.join(__dirname, 'project-dist', 'bundle.css');

fs.writeFile(cssBundle, '', (err) => {
  if (err) {
    throw err;
  }
});

fs.readdir(stylesPath, { withFileTypes: true }, (err, data) => {
  if (err) {
    throw err;
  }

  const cssFiles = data.filter((file) => path.extname(file.name) === '.css' && !file.isDirectory());
  const cssFilesPath = cssFiles.map((cssFile) => path.join(stylesPath, cssFile.name));
  cssFilesPath.forEach((cssFilePath) => {
    console.log(cssFilePath);
    fs.readFile(cssFilePath, 'utf-8', (err, data) => {
      if (err) {
        throw err;
      }
      fs.appendFile(cssBundle, data, (err) => {
        if (err) {
          throw err;
        }
      });
    });
  });
  //console.log(cssFilesPath);
});