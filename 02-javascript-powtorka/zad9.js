'use strict';
const result = myUsers.map((animal) => {
  const { name, likes } = animal;
  return { [name]: likes, age: name.length * 10 };
}, []);

console.log(result);
