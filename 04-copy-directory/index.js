const path = require('path');
const fs = require('fs');
//const fsPromises = fs.promises;

async function copyDir() {

  const folderPath = path.join(__dirname, 'files');
  const copyFolderPath = path.join(__dirname, 'files-copy');

  await

  fs.promises.rm(copyFolderPath, { recursive: true, force: true });  // удаляем копи-папку с вложенными файлами

  fs.mkdir(copyFolderPath, { recursive: true }, err => { //cоздаем копи-папку
    if (err) throw err;
  });

  fs.readdir(folderPath, { withFileTypes: true }, (err, files) => { // читаем содержимое папки
    if (err) throw err;

    files.forEach(file => {
      const filePath = path.join(__dirname, 'files', file.name);//пути к файлам в папке и копи-папке
      const copyFilePath = path.join(__dirname, 'files-copy', file.name);

      /* fs.copyFile(filePath, copyFilePath, (err) => {
        if (err) throw err; */

      fs.createReadStream(filePath).pipe(fs.createWriteStream(copyFilePath)); //создаем потоки записи и чтения м записываем данные из папки в копи-папку, используя pipe

    });
  });
}


try {
  copyDir();
  console.log('Все файлы скопированы из папки files в папку files-copy. \nСпасибо за кроссчек!');
} catch (err) {
  console.log(err);
}



