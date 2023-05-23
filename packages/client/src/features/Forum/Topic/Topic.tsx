import { CommentOutlined, HeartFilled, HeartOutlined } from '@ant-design/icons';
import { Button, Typography } from 'antd';
import React from 'react';
import type { FC } from 'react';

import './Topic.scss';

type TopicProps = {
  body?: string;
  comments?: Comment[];
  id: number;
  isFav?: boolean;
  title: string;
};

export const Topic: FC<TopicProps> = ({ id, title, body, isFav, comments }) => {
  const commentLength = comments?.length || 0;

  return (
    <li key={id} className="topic">
      <header className="topic__header">
        <Typography.Title level={3} className="topic__title">
          {title}
        </Typography.Title>
        <Button type="icon" className="topic__button" htmlType="button">
          {isFav ? <HeartFilled /> : <HeartOutlined />}
        </Button>
      </header>
      <footer className="topic__footer">
        <Typography.Paragraph>{body}</Typography.Paragraph>
        {commentLength > 0 && (
          <Button type="icon" htmlType="button">
            <CommentOutlined />
          </Button>
        )}
      </footer>
    </li>
  );
};
