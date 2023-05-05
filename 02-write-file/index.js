const path = require('path');
const fs = require('fs');
const readline = require('readline');
const { stdin } = process;

const fileName = 'file.txt';
const filepath = path.join(__dirname, fileName);
const writeStream = fs.createWriteStream(filepath);
const rl = readline.createInterface(stdin);

const clossApp = () => {
  writeStream.end();
  rl.close();
  process.exit();
}

const handleInput = (answer) => {
  if (answer === 'exit') {
    clossApp();
  } else {
    writeStream.write(answer + '\n');
    rl.question('', handleInput);
  }
};

console.log(`Hello, type something to create ${fileName}`);

rl.question('', handleInput);

rl.on('close', () => {
  console.log(`\nThe ${fileName} has been saved. Bye!`);
});

process.on('SIGINT', clossApp);

rl.on('error', () => console.error(error));
writeStream.on('error', () => console.error(error));
