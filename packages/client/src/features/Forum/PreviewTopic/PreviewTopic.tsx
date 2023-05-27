import { CommentOutlined } from '@ant-design/icons';
import { Button, Typography } from 'antd';
import type { Author } from 'models/forum.model';
import React from 'react';
import type { FC } from 'react';

import 'features/Forum/PreviewTopic/PreviewTopic.scss';

type TopicProps = {
  author: Author;
  body: string;
  commentsCount?: number;
  date: string;
  id: number;
  title: string;
};

export const PreviewTopic: FC<TopicProps> = ({ id, date, title, body, commentsCount, author }) => {
  const { authorName } = author || {};
  const resDate = new Date(date).toDateString() || '';

  return (
    <li key={id} className="topic">
      <header className="topic__header">
        <Typography.Paragraph className="topic__username">@{authorName}</Typography.Paragraph>
        <Typography.Text className="topic__date">{resDate}</Typography.Text>
      </header>
      <div className="topic__content">
        <Typography.Title level={3} className="topic__title">
          {title}
        </Typography.Title>
        <Typography.Text>{`${body.substring(0, 100)}...`}</Typography.Text>
      </div>
      <footer className="topic__footer">
        {commentsCount && (
          <Button className="topic__comments" type="ghost" htmlType="button">
            {commentsCount}
            <CommentOutlined />
          </Button>
        )}
      </footer>
    </li>
  );
};
