import type { Topic } from 'models/forum.model';
import type { FC, FormEvent } from 'react';
import { useState } from 'react';
import { useIntl } from 'react-intl';
import { Button, Input } from 'antd';
import Title from 'antd/lib/typography/Title';
import { Topics } from './Topics';
import { messages } from './common';

import './Forum.scss';

const mokeTopics: Topic[] = [
  {
    id: 1,
    userId: 1,
    title: 'Topic 1',
    body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam',
    comments: [
      {
        id: 1,
        userId: 1,
        body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam',
      },
    ],
    isFav: true,
  },
  {
    id: 2,
    userId: 2,
    title: 'Topic 2',
    body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam',
    isFav: false,
  },
];

export const Forum: FC = () => {
  const { formatMessage: fm } = useIntl();

  const [newTopicName, setNewTopicName] = useState('');

  const handleNewTopicNameInput = (e: FormEvent<HTMLInputElement>) => {
    const { value } = e.target as HTMLInputElement;
    setNewTopicName(value);
  };

  return (
    <div className="forum">
      <div className="forum__main">
        <Title level={2} className="forum__title">
          {fm(messages.title)}
        </Title>
        <div className="forum__create-topic">
          <Input onInput={handleNewTopicNameInput} value={newTopicName} />
          <Button htmlType="button" type="primary">
            {fm(messages.createTopicBtn)}
          </Button>
        </div>
        <Topics className="forum__topics" topics={mokeTopics} />
      </div>
    </div>
  );
};
