const path = require('path');
const fs = require('fs');

const folderPath = path.join(__dirname, 'styles');//D:\RS project\HTML-builder\05-merge-styles\styles
const bundlePath = path.join(__dirname, 'project-dist', 'bundle.css');


fs.readdir(folderPath, { withFileTypes: true }, (err, files) => { // читаем содержимое папки
  if (err) throw err;

  files.forEach((file) => {
    const filePath = path.join(__dirname, 'styles', file.name);
    const ext = '.css';

    if (file.isFile() ) {
      if (path.extname(filePath) === ext){
        // console.log(file);

        fs.readFile(filePath, 'utf-8', (err, data) => {
          if (err) throw err;

          let  stylesData = '';
          stylesData  += data;
          // console.log( stylesData);

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
  console.log('bundle.css создан и содержит актуальные стили');
});
