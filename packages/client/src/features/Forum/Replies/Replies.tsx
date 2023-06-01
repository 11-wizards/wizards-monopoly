import { useGetRepliesQuery } from 'api/forum.api';
import classNames from 'classnames';
import { Reply } from 'features/Forum/Reply';
import type { Reply as ReplyType } from 'models/forum.model';
import type { FC } from 'react';

import './Replies.scss';

type RepliesProps = {
  className?: string;
  skipFetch: boolean;
};

export const Replies: FC<RepliesProps> = ({ className = '', skipFetch }) => {
  const { data: replies = [] as ReplyType[] } = useGetRepliesQuery(null, { skip: skipFetch });

  return (
    <ul className={classNames('replies', className)}>
      {replies.map(({ replyId, ...props }) => (
        <Reply key={replyId} {...props} />
      ))}
    </ul>
  );
};
