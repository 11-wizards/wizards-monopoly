import { useGetRepliesQuery } from 'api/forum.api';
import classNames from 'classnames';
import { Reply } from 'features/Forum/Reply';
import type { Reply as ReplyType } from 'models/forum.model';
import type { FC } from 'react';

import './Replies.scss';

type RepliesProps = {
  className?: string;
  commentId: number;
  skipFetch: boolean;
  topicId: string;
};

export const Replies: FC<RepliesProps> = ({ className = '', skipFetch, commentId, topicId }) => {
  const { data: replies = [] as ReplyType[] } = useGetRepliesQuery(
    { commentId, topicId },
    { skip: skipFetch },
  );

  return (
    <ul className={classNames('replies', className)}>
      {replies.map(({ replyId, ...props }) => (
        <Reply key={replyId} {...props} commentId={commentId} topicId={Number(topicId)} />
      ))}
    </ul>
  );
};
