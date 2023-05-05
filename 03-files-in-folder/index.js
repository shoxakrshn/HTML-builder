const path = require('path');
const fs = require('fs');

const folderPath = path.join(__dirname, 'secret-folder');

fs.readdir(folderPath, { withFileTypes: true }, (err, data) => {
  if (err) {
    console.log(err);
  }
  const onlyFiles = data.filter((file) => !file.isDirectory());

  onlyFiles.map((file) => {
      const filePath = path.join(folderPath, file.name);
      fs.stat(filePath, (err, data) => {
        if (err) {
          console.log(err);
        }

        const [fileName, extension] = path.basename(filePath).split('.');
        console.log(`${fileName} - ${extension} - ${data.size / 1000} kb`)
      });
    });
});
