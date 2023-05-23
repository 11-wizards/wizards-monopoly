import classNames from 'classnames';
import { Topic } from 'features/Forum/Topic/Topic';
import React from 'react';

import 'features/Forum/Topics/Topics.scss';

type TopicsProps = {
  className?: string;
  topics: Topic[];
};

export const Topics: React.FC<TopicsProps> = ({ topics, className = '' }) => (
  <ul className={classNames(className, 'topics')}>
    {topics.map(({ id, title, body, isFav, comments }) => (
      <Topic id={id} title={title} body={body} isFav={isFav} comments={comments} />
    ))}
  </ul>
);
