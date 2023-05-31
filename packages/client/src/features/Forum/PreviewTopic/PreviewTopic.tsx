import { CommentOutlined } from '@ant-design/icons';
import { Typography } from 'antd';
import { TopicUserInfo } from 'components/TopicUserInfo/TopicUserInfo';
import type { Topic } from 'models/forum.model';
import React from 'react';
import type { FC } from 'react';
import { Link } from 'react-router-dom';

import './PreviewTopic.scss';

type TopicProps = Omit<Topic, 'topicId'> & {
  id: number;
};
export const PreviewTopic: FC<TopicProps> = ({ id, date, title, body, commentsCount, author }) => {
  const { authorName } = author;

  // TODO: взять path для ссылки из бэкенда
  return (
    <li className="preview-topic">
      <Link className="preview-topic__wrapper" to={`/forum/topic/${id}`}>
        <header className="preview-topic__header">
          <TopicUserInfo date={date} authorName={authorName} />
        </header>
        <div className="preview-topic__content">
          <Typography.Title level={3} className="preview-topic__title">
            {title}
          </Typography.Title>
          <Typography.Text>{`${body.substring(0, 100)}...`}</Typography.Text>
        </div>
        <footer className="preview-topic__footer">
          {commentsCount && (
            <div className="preview-topic__comments">
              {commentsCount}
              <CommentOutlined />
            </div>
          )}
        </footer>
      </Link>
    </li>
  );
};
