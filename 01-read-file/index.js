const path = require('path');
const fs = require('fs');
const { stdout } = process;

const filepath = path.join(__dirname, 'text.txt');
const readStream = fs.createReadStream(filepath, 'utf-8');
readStream.on('data', (chunk) => stdout.write(chunk));