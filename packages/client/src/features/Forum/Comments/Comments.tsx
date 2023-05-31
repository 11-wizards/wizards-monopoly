import { useGetAllCommentsQuery } from 'api/forum.api';
import { Comment } from 'features/Forum/Comment';
import type { FC } from 'react';

import './Comments.scss';

export const Comments: FC = () => {
  const { data: comments = [] } = useGetAllCommentsQuery();

  return (
    <ul className="comments">
      {comments.map(({ commentId, ...props }) => (
        <Comment key={commentId} {...props} />
      ))}
    </ul>
  );
};
