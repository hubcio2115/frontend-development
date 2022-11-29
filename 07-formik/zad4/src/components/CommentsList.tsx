import { IComment } from '../App';

interface CommentsListProps {
  comments: IComment[];
}

const CommentsList = ({ comments }: CommentsListProps) => (
  <ul>
    {comments.map(({ id, name, email, body }) => (
      <li key={id}>
        <p>
          {email} {name}
        </p>
        <p>{body}</p>
      </li>
    ))}
  </ul>
);

export default CommentsList;
