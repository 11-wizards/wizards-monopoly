import { Space, Typography } from 'antd';
import { useGetTopicQuery } from 'api/forum.api';
import { TopicUserInfo } from 'components/TopicUserInfo/TopicUserInfo';
import { Comments } from 'features/Forum/Comments';
import { NewComment } from 'features/Forum/NewComment';
import type { FC } from 'react';
import { useParams } from 'react-router-dom';

import './TopicPage.scss';

export const TopicPage: FC = () => {
  const { topicId = 100 } = useParams();
  console.log('911.', topicId);
  const { data: topic = {} } = useGetTopicQuery(topicId);
  const { title, date, body, author } = topic || {};

  return (
    <div className="topic-page page">
      <div className="topic-page__main">
        <Space className="topic-page__space">
          <header>
            <TopicUserInfo date={date} authorName={author?.authorName} />
            <Typography.Title level={2}>{title}</Typography.Title>
          </header>
          <Typography.Paragraph>{body}</Typography.Paragraph>
        </Space>
        <NewComment />
        <Comments className="topic-page__comments" />
      </div>
    </div>
  );
};
