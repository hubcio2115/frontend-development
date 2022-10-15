'use strict';
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on('line', (input) => {
  if (parseInt(input) < 0) return;

  const number = parseInt(input, 10);
  const numbers = [...Array(number).keys()];

  numbers.forEach((num) => {
    console.log(`${'*'.repeat(num + 1)}`);
  });

  [...numbers].reverse().forEach((num) => {
    console.log('*'.repeat(num + 1));
  });

  [...numbers].reverse().forEach((num, index) => {
    console.log(`${' '.repeat(index)}${'*'.repeat(num + 1)}`);
  });

  [...numbers].forEach((num, _, arr) => {
    console.log(`${' '.repeat(arr.length - 1 - num)}${'*'.repeat(num + 1)}`);
  });
});
