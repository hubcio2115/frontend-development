'use strict';
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on('line', (input) => {
  const arrOfWords = input.split(' ');

  const result = arrOfWords.reduce((acc, word) => {
    return Object.keys(acc).includes(word)
      ? Object.assign(Object.assign({}, acc), { [word]: acc[word] + 1 })
      : Object.assign(Object.assign({}, acc), { [word]: 1 });
  }, {});

  console.log(result);
});
