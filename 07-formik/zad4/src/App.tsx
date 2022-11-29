import { useEffect, useState } from 'react';
import CommentForm from './components/CommentForm';
import CommentsList from './components/CommentsList';
import { z } from 'zod';
import { fetchComments } from './utils/fetchComments';

export const commentSchema = z.object({
  postId: z.number(),
  id: z.number(),
  name: z.string(),
  email: z.string(),
  body: z.string(),
});

export type IComment = z.infer<typeof commentSchema>;

const App = () => {
  const [comments, setComments] = useState<IComment[]>([]);

  useEffect(() => {
    const controller = new AbortController();

    (async () => {
      const data = await fetchComments(controller);

      if (!!data) setComments(data);
    })();

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <div>
      <CommentForm setComments={setComments} />

      <CommentsList comments={comments} />
    </div>
  );
};

export default App;
