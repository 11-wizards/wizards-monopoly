import type { FC, FormEvent } from 'react';
import { useState } from 'react';
import { useIntl } from 'react-intl';
import { Button, Input } from 'antd';
import Title from 'antd/lib/typography/Title';
import { PreviewTopics } from './PreviewTopics';
import { messages } from './common';

import './Forum.scss';

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
        <PreviewTopics className="forum__topics" />
      </div>
    </div>
  );
};
