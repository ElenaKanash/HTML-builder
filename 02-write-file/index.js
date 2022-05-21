const fs = require('fs');
const path = require('path');

const { stdin, stdout } = process;

const filePath = path.join(__dirname, 'text.txt');

const textFile = fs.createWriteStream((filePath), (err) => { // создали новый файл text.txt
  if (err) {
    throw  err;
  }
});

stdout.write('Пожалуйста, введите здесь текст\n'); // вывели текст в консоль

// подписываемся на событие 'data' объекта stdin и вводим в консоль текст и нажимаем клавишу Enter, stdout.write() возвращает введённый нами текст.
stdin.on('data', data => {
  const dataStringified = data.toString().trim();

  if(dataStringified === 'exit') {
    stdout.write('\nДо свидания! Удачи в изучении Javascript и Node.js!');
    process.exit();
  } else {
    textFile.write(dataStringified);
  }
  // process.exit();
});

process.on('SIGINT', () => {
  stdout.write('\nДо свидания! Удачи в изучении Javascript и Node.js!');
  process.exit();
});
