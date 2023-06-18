import { useGetAllCommentsQuery } from 'api/forum.api';
import { Comment } from 'features/Forum/Comment';
import type { Comment as TComment } from 'models/forum.model';
import type { FC } from 'react';

import './Comments.scss';

type CommentsProps = {
  topicId: string;
};

export const Comments: FC<CommentsProps> = ({ topicId }) => {
  const { data: comments = [] as TComment[] } = useGetAllCommentsQuery(topicId);

  return (
    <ul className="comments">
      {comments.map(({ commentId, ...props }) => (
        <Comment key={commentId} commentId={commentId} {...props} />
      ))}
    </ul>
  );
};
