import { CommentOutlined } from '@ant-design/icons';
import { Typography } from 'antd';
import { TopicUserInfo } from 'components/TopicUserInfo/TopicUserInfo';
import type { Topic } from 'models/forum.model';
import React from 'react';
import type { FC } from 'react';
import { Link } from 'react-router-dom';

import './PreviewTopic.scss';

type TopicProps = Topic;

const { Title, Paragraph } = Typography;
export const PreviewTopic: FC<TopicProps> = ({
  topicId,
  date,
  title,
  body,
  commentsCount,
  author,
}) => {
  const { authorName } = author;

  const cutBody = (str: string) => {
    if (str.length > 100) {
      return `${str.substring(0, 100)}...`;
    }

    return str;
  };

  return (
    <li className="preview-topic">
      <Link className="preview-topic__wrapper" to={`/forum/topic/${topicId}`}>
        <header className="preview-topic__header">
          <TopicUserInfo date={date} authorName={authorName} />
        </header>
        <div className="preview-topic__content">
          <Title level={3} className="preview-topic__title">
            {title}
          </Title>
          <Paragraph>{cutBody(body)}</Paragraph>
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
