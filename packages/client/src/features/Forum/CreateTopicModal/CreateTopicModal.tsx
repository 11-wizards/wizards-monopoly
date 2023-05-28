import { Button, Col, Form, Input, Modal, Row, Space } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useCreateTopicMutation } from 'api/forum.api';
import type { RootState } from 'app/store';
import { useAppSelector } from 'hooks';
import type { CurrentUser } from 'models/auth.model';
import type { FC, MouseEventHandler } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { Controller, useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';
import { messages } from './common';

import 'features/Forum/CreateTopicModal/CreateTopicModal.scss';

type TopicValues = {
  content?: string;
  title?: string;
};

type CreateTopicModalProps = {
  className?: string;
  isOpen: boolean;
  onModalClose: MouseEventHandler<HTMLButtonElement>;
};

export const CreateTopicModal: FC<CreateTopicModalProps> = ({ isOpen, onModalClose }) => {
  const { formatMessage: fm } = useIntl<TopicValues>();

  const [createTopic] = useCreateTopicMutation();
  const user: CurrentUser = useAppSelector((state: RootState) => state.user.currentUser);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<TopicValues>({
    defaultValues: {
      content: '',
      title: '',
    },
  });

  const onSubmit: SubmitHandler<TopicValues> = async (data) => {
    await createTopic({
      author: {
        author_id: user?.id,
        author_username: user?.displayName,
      },
      body: data.content,
      title: data.title,
    });
  };

  return (
    <Modal
      title={fm(messages.newTopicName)}
      open={isOpen}
      onCancel={onModalClose}
      footer={[
        <Button htmlType="button" onClick={handleSubmit(onSubmit)}>
          {fm(messages.createTopicBtn)}
        </Button>,
      ]}
    >
      <Row justify="center">
        <Col>
          <Space className="create-topic__space" align="vertical">
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
                  render={({ field }) => <TextArea {...field} />}
                />
              </Form.Item>
            </Form>
          </Space>
        </Col>
      </Row>
    </Modal>
  );
};
