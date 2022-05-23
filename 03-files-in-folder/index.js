const fs = require('fs');
const path = require('path');

const folderPath = path.join(__dirname, 'secret-folder');
//console.log(folderPath); //D:\RS project\HTML-builder\03-files-in-folder

fs.readdir(folderPath, { withFileTypes: true }, (err, files) => { // читаем содержимое папки,  withFileTypes позволяет проверить тип файла(исключить вложенные папки)
  files.forEach(file => {

    const filePath = path.join(folderPath, file.name);//пути к файлом в папке

    fs.stat(filePath, (err, stats) => { //получаем информацию о файле
      if (err) { throw err; }
      if (stats.isFile()) {     // проверяем, является ли файлом
        stats.size; // вес каждого файла в байтах
        const stat = (stats.size / 1024).toFixed(1);
        const ext = path.extname(filePath).slice(1); //расширение каждого файла
        console.log(file.name + ' - ' + ext + ' - ' + stat + 'kb');
      }
    });   // console.log(file);
  });
});











