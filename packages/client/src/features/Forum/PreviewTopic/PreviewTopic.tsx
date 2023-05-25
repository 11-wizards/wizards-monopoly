import { CommentOutlined } from '@ant-design/icons';
import { Button, Typography } from 'antd';
import type { Author } from 'models/forum.model';
import React from 'react';
import type { FC } from 'react';

import 'features/Forum/PreviewTopic/PreviewTopic.scss';

type TopicProps = {
  commentsCount?: number;
  desc?: string;
  id: number;
  title: string;
  user: Author;
};

export const PreviewTopic: FC<TopicProps> = ({ id, title, desc, commentsCount, user }) => {
  const { name: username } = user;

  return (
    <li key={id} className="topic">
      <div className="topic__user">
        <Typography.Text className="topic__user-name">{username}</Typography.Text>
      </div>
      <Typography.Title level={3} className="topic__title">
        {title}
      </Typography.Title>
      <footer className="topic__footer">
        <Typography.Paragraph>{desc}</Typography.Paragraph>
        {commentsCount && (
          <Button type="ghost" htmlType="button">
            <CommentOutlined />
          </Button>
        )}
      </footer>
    </li>
  );
};
