'use strict';
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on('line', (input) => {
  const numbers = input.split('').map((string) => parseInt(string, 10));

  const calculationCheck = numbers.reduce(
    (acc, el, _, arr) => acc + Math.pow(el, arr.length),
    0,
  );

  const isArmstrong = parseInt(input) === calculationCheck;
  console.log(`${isArmstrong}`);
});
