'use strict';
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on('line', (input) => {
  const numbers = input.split(' ').reduce((acc, el) => parseFloat(el) + acc, 0);

  console.log(numbers);
});
