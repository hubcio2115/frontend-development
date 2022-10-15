'use strict';
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on('line', (input) => {
  const numbers = input.split(' ').map((string) => parseInt(string, 10));

  console.log(numbers.reduce((acc, num) => num + acc, 0));
});
