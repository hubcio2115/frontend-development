'use strict';
const axios = require('axios');
axios
  .get('https://jsonplaceholder.typicode.com/posts')
  .then((res) => {
    if (res.status === 200) return res.data;
  })
  .then((posts) => {
    posts.map((post) => {
      const { title, body } = post;
      console.log(title);
      console.log(body);
    });
  })
  .catch((e) => {
    console.error(e.message);
  });
