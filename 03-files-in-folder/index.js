const fs = require('fs');
const path = require('path');

const folderPath = path.join(__dirname, 'secret-folder');
//console.log(folderPath); //D:\RS project\HTML-builder\03-files-in-folder


fs.readdir(folderPath, { withFileTypes: true }, (err, files) => {
  files.forEach(file => {

    const filePath = path.join(folderPath, file.name);

    fs.stat(filePath, (err, stats) => {
      if (err) { throw err; }
      if (stats.isFile()) {
        stats.size;
        const stat = (stats.size / 1024).toFixed(1);
        const ext = path.extname(filePath).slice(1);
        console.log(file.name + ' - ' + ext + ' - ' + stat + 'kb');
      }
    });   // console.log(file);
  });
});











