import classNames from 'classnames';
import { PreviewTopic } from 'features/Forum/PreviewTopic/PreviewTopic';
import type { PreviewTopic as TPreviewTopic } from 'models/forum.model';
import React from 'react';

import 'features/Forum/PreviewTopics/PreviewTopics.scss';

type PreviewTopicsProps = {
  className?: string;
};

export const PreviewTopics: React.FC<PreviewTopicsProps> = ({ className = '' }) => {
  // TODO: get topics from API
  const topics: TPreviewTopic[] = [];

  return (
    <ul className={classNames(className, 'topics')}>
      {topics.length > 0 &&
        topics.map(({ id, title, desc, commentsCount, user }) => (
          <PreviewTopic
            id={id}
            title={title}
            desc={desc}
            commentsCount={commentsCount}
            user={user}
          />
        ))}
    </ul>
  );
};
