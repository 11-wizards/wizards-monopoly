import { useGetAllTopicsQuery } from 'api/forum.api';
import classNames from 'classnames';
import { PreviewTopic } from 'features/Forum/PreviewTopic';
import type { Topic } from 'models/forum.model';
import React from 'react';

import './PreviewTopics.scss';

type PreviewTopicsProps = {
  className?: string;
};

export const PreviewTopics: React.FC<PreviewTopicsProps> = ({ className = '' }) => {
  const { data: topics = [] as Topic[] } = useGetAllTopicsQuery();

  return (
    <ul className={classNames(className, 'topics')}>
      {topics.length > 0 &&
        topics.map(({ topicId, ...rest }) => (
          <PreviewTopic key={topicId} topicId={topicId} {...rest} />
        ))}
    </ul>
  );
};
