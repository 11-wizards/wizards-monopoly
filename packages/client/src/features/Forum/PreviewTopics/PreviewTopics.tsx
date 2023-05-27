import { useGetTopicsQuery } from 'api/forum.api';
import classNames from 'classnames';
import { PreviewTopic } from 'features/Forum/PreviewTopic/PreviewTopic';
import React from 'react';

import 'features/Forum/PreviewTopics/PreviewTopics.scss';

type PreviewTopicsProps = {
  className?: string;
};

export const PreviewTopics: React.FC<PreviewTopicsProps> = ({ className = '' }) => {
  const { data: topics = [] } = useGetTopicsQuery();

  return (
    <ul className={classNames(className, 'topics')}>
      {topics.length > 0 &&
        topics.map(({ topicId, title, body, date, commentsCount, author }) => (
          <PreviewTopic
            key={topicId}
            id={topicId}
            title={title}
            body={body}
            date={date}
            commentsCount={commentsCount}
            author={author}
          />
        ))}
    </ul>
  );
};
