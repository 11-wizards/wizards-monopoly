import { Button, Space } from 'antd';
import classNames from 'classnames';
import type { Reply as TReply } from 'models/forum.model';
import type { FC } from 'react';
import { useIntl } from 'react-intl';
import { messages } from './common';

import './Reply.scss';

type ReplyProps = TReply & {
  className?: string;
};

export const Reply: FC<ReplyProps> = ({ className = '', author, body }) => {
  const { authorName } = author;
  const { formatMessage: fm } = useIntl();

  return (
    <li className={classNames('reply', className)}>
      <Space className="reply__space" direction="vertical">
        <div className="reply__content">{body}</div>
        <footer className="reply__footer">
          by {authorName}
          <Button>{fm(messages.replyBtn)}</Button>
        </footer>
      </Space>
    </li>
  );
};
