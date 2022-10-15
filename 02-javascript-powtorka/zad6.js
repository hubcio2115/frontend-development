'use strict';
new Promise((resolve) =>
  setTimeout(() => {
    resolve('Udało się!');
  }, 5000),
).then((res) => {
  console.log(res);
});
