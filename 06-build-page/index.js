const path = require('path');
const fs = require('fs');

const folderPath = path.join(__dirname, 'assets');
const copyFolderPath = path.join(__dirname, 'project-dist');

// копирование из папки assets в папку project-dist.

async function copyDir(folderPath, copyFolderPath ) {
  try {
    await
    // fs.promises.rm(copyFolderPath, { recursive: true, force: true });  // удаляем копи-папку с вложенными файлами
    fs.mkdir(copyFolderPath, { recursive: true }, err => { //cоздаем копи-папку
      if (err) throw err;
    });
    fs.readdir(folderPath, { withFileTypes: true }, (err, files) => { // читаем содержимое папки
      if (err) throw err;
      files.forEach(file => {
        const filePath = path.join(folderPath, file.name);//пути к файлам в папке и копи-папке
        const copyFilePath = path.join(copyFolderPath, file.name);
        if (file.isFile()) { //копируем файл с проверкой на файл
          fs.copyFile(filePath, copyFilePath, (err) => {
            if (err) throw err;
          });
        }
        if (file.isDirectory()) { // копируем папку с проверкой на папку
          copyDir(filePath, copyFilePath);
        }
      });
    });
  } catch (err) {
    console.log(err);
  }
}
copyDir(folderPath, copyFolderPath );

console.log('Все файлы скопированы из папки assets в папку project-dist.');

//создание style.css в папке project-dist и запись в него стилей из папки styles
const folderStylePath = path.join(__dirname, 'styles');
const bundlePath = path.join(__dirname, 'project-dist', 'style.css');


fs.readdir(folderStylePath, { withFileTypes: true }, (err, files) => { // читаем содержимое папки
  if (err) throw err;
  files.forEach((file) => {
    const filePath = path.join(__dirname, 'styles', file.name);
    const ext = '.css';
    if (file.isFile() ) {
      if (path.extname(filePath) === ext){
        fs.readFile(filePath, 'utf-8', (err, data) => {
          if (err) throw err;
          let  stylesData = '';
          stylesData  += data;

          fs.open(bundlePath, 'w', (err) => { // cоздать устой файл, готовый для записи
            if(err) throw err;
          });
          fs.appendFile(bundlePath, stylesData, (err)=>{ //добавить запись в файл
            if(err) throw err;
          });
        });
      }
    }
  });
  console.log('style.css создан и содержит актуальные стили');
});

// создание index.html в папке project-dist и запись в него информации из папки components
const fileHtmlPath = path.join(__dirname, 'project-dist', 'index.html');
const fileTemplatePath = path.join(__dirname, 'template.html');

fs.open(fileHtmlPath, 'w', (err) => { // cоздать пустой файл, готовый для записи
  if (err) throw err;
  console.log('файл index.html создан');

  fs.copyFile(fileTemplatePath, fileHtmlPath, (err) => {
    if (err) throw err;
  });
});

fs.readFile(fileHtmlPath, 'utf-8', (err, data) => {
  if (err) throw err;
  let content = data;
 // console.log(data);
});
