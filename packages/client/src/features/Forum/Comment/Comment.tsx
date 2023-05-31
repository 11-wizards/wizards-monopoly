import { Button, Space } from 'antd';
import { TopicUserInfo } from 'components/TopicUserInfo/TopicUserInfo';
import { Replies } from 'features/Forum/Replies';
import type { Comment as TComment } from 'models/forum.model';
import { useState } from 'react';
import type { FC } from 'react';
import { useIntl } from 'react-intl';
import { messages } from './common';

import './Comment.scss';

type CommentProps = TComment;

export const Comment: FC<CommentProps> = ({ author, body, date, repliesCount }) => {
  const { authorName } = author;
  const { formatMessage: fm } = useIntl();

  const [showReplies, setShowReplies] = useState(false);

  const onBtnRepliesClick = () => {
    setShowReplies(!showReplies);
  };

  return (
    <li className="comment">
      <Space className="comment__space" direction="vertical">
        <header className="comment__header">
          <TopicUserInfo date={date} authorName={authorName} />
        </header>
        <div className="comment__content">{body}</div>
        <footer className="comment__footer">
          <Button className="comment__btn-replies" type="ghost" onClick={onBtnRepliesClick}>
            {`${fm(messages.repliesBtnCount)} ${repliesCount}`}
          </Button>
          <Button type="ghost">{fm(messages.repliesBtn)}</Button>
        </footer>
      </Space>
      <Replies className="comment__replies" skipFetch={!showReplies} />
    </li>
  );
};
