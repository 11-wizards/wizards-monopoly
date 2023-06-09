import { Button, Form, Input, Modal, Space } from 'antd';
import { useCreateTopicMutation } from 'api/forum.api';
import type { RootState } from 'app/store';
import { randomize } from 'features/Forum/common';
import { sanitizeObject } from 'helpers';
import { useAppSelector } from 'hooks';
import type { FC, MouseEventHandler } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { Controller, useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';
import { DEFAULT_TEXTAREA_ROWS } from 'constants/forum';
import { messages } from './common';

import './CreateTopicModal.scss';

type TopicValues = {
  content: string;
  title: string;
};

type CreateTopicModalProps = {
  className?: string;
  isOpen: boolean;
  onModalClose: MouseEventHandler<HTMLButtonElement>;
  setModalOpen: (isOpen: boolean) => void;
};

const { TextArea } = Input;

export const CreateTopicModal: FC<CreateTopicModalProps> = ({
  isOpen,
  onModalClose,
  setModalOpen,
}) => {
  const { formatMessage: fm } = useIntl();

  const [createTopic] = useCreateTopicMutation();

  const user = useAppSelector((state: RootState) => state.user.currentUser);

  const { handleSubmit, control, reset } = useForm<TopicValues>({
    defaultValues: {
      content: '',
      title: '',
    },
  });

  const onCreateTopicBtnClick: SubmitHandler<TopicValues> = async (data) => {
    if (user === null) {
      return;
    }

    const topicId = randomize();

    const { content, title } = sanitizeObject<TopicValues>(data);

    await createTopic({
      author: {
        author_id: user.id,
        name: user.login,
      },
      body: content,
      title,
      topic_id: topicId,
    }).then((res) => {
      if (!('error' in res)) {
        reset();
        setModalOpen(false);
      }
    });
  };

  const handleAfterClose = () => reset();

  return (
    <Modal
      title={fm(messages.newTopicName)}
      open={isOpen}
      onCancel={onModalClose}
      centered
      afterClose={handleAfterClose}
      footer={[
        <Button htmlType="button" onClick={handleSubmit(onCreateTopicBtnClick)}>
          {fm(messages.createTopicBtn)}
        </Button>,
      ]}
    >
      <Space className="create-topic__space">
        <Form className="create-topic__form" layout="vertical">
          <Form.Item label={fm(messages.newTopicName)}>
            <Controller
              name="title"
              control={control}
              render={({ field }) => <Input {...field} />}
            />
          </Form.Item>
          <Form.Item label={fm(messages.newTopicContent)}>
            <Controller
              name="content"
              control={control}
              render={({ field }) => <TextArea rows={DEFAULT_TEXTAREA_ROWS} {...field} />}
            />
          </Form.Item>
        </Form>
      </Space>
    </Modal>
  );
};
