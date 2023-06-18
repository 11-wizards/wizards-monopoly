import { Button } from 'antd';
import { CreateTopicModal } from 'features/Forum/CreateTopicModal';
import { useCallback, useState } from 'react';
import type { FC, MouseEventHandler } from 'react';
import { useIntl } from 'react-intl';
import Title from 'antd/lib/typography/Title';
import { PreviewTopics } from './PreviewTopics';
import { messages } from './common';

import './Forum.scss';

export const Forum: FC = () => {
  const { formatMessage: fm } = useIntl();
  const [isModalOpen, setModalOpen] = useState(false);

  const handleBtnClick = () => setModalOpen(true);

  const handleModalClose = useCallback<MouseEventHandler<HTMLButtonElement>>(
    () => setModalOpen(false),
    [],
  );

  return (
    <div className="forum">
      <div className="forum__main">
        <Title level={2} className="forum__title">
          {fm(messages.title)}
        </Title>
        <CreateTopicModal
          isOpen={isModalOpen}
          onModalClose={handleModalClose}
          setModalOpen={setModalOpen}
        />
        <Button type="primary" className="forum__btn" onClick={handleBtnClick}>
          {fm(messages.createTopicBtn)}
        </Button>
        <PreviewTopics className="forum__topics" />
      </div>
    </div>
  );
};
