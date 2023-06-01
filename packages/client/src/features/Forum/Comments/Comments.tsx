import { useGetAllCommentsQuery } from 'api/forum.api';
import { Comment } from 'features/Forum/Comment';
import type { Comment as TComment } from 'models/forum.model';
import type { FC } from 'react';

import './Comments.scss';

export const Comments: FC = () => {
  const { data: comments = [] as TComment[] } = useGetAllCommentsQuery();

  return (
    <ul className="comments">
      {comments.map(({ commentId, ...props }) => (
        <Comment key={commentId} {...props} />
      ))}
    </ul>
  );
};
