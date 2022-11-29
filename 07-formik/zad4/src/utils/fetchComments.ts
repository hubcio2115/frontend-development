import { z } from 'zod';
import { commentSchema } from '../App';

export const fetchComments = async (controller?: AbortController) => {
  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/comments', {
      signal: controller?.signal,
    });

    if (res.ok) return z.array(commentSchema).parse(await res.json());
    else throw Error('Something went wrong with the request');
  } catch (e) {
    console.error(e);
  }
};
