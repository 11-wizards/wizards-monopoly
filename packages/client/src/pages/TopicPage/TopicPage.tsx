import { Space, Typography } from 'antd';
import { useGetTopicQuery } from 'api/forum.api';
import { TopicUserInfo } from 'components/TopicUserInfo/TopicUserInfo';
import { Comments } from 'features/Forum/Comments';
import { NewComment } from 'features/Forum/NewComment';
import type { Topic } from 'models/forum.model';
import type { FC } from 'react';
import { useParams } from 'react-router-dom';

import './TopicPage.scss';

type TopicParams = {
  topicId: string;
};

const { Title, Paragraph } = Typography;

export const TopicPage: FC = () => {
  const { topicId } = useParams<TopicParams>();
  const { data: topic = {} as Topic } = useGetTopicQuery(Number(topicId));

  const { title, date, body, author } = topic;

  return (
    <div className="topic-page page">
      <div className="topic-page__main">
        <Space className="topic-page__space">
          <header>
            <TopicUserInfo date={date} authorName={author?.authorName} />
            <Title level={2}>{title}</Title>
          </header>
          <Paragraph>{body}</Paragraph>
        </Space>
        <NewComment topicId={topicId} />
        <Comments topicId={topicId} />
      </div>
    </div>
  );
};
