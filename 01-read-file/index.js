const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'text.txt')
/* const filePath = path.resolve(__dirname, 'text.txt') */

 const readStream = fs.createReadStream(filePath, 'utf-8');
readStream.on('data', chunk => console.log(chunk));

/*  fs.readFile(filePath, 'utf-8', (err, data) => {
  if (err) {
    throw  err   // если возникла ошибка
  }
  console.log(data)  // выводим считанные данные из файла text.txt
}) */

/*  const readStream = fs.createReadStream(filePath, 'utf-8'); // если большой файл передаем
let data = '';
readStream.on('data', chunk => data += chunk);
readStream.on('end', () => console.log('End', data));
readStream.on('error', error => console.log('Error', error.message));  // если возникла ошибка */


