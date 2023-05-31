import { Button, Form, Space, Typography } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useCreateCommentMutation } from 'api/forum.api';
import { DEFAULT_TEXTAREA_ROWS } from 'constants/forum';
import { messages } from 'pages/TopicPage/common';
import type { FC } from 'react';
import { useIntl } from 'react-intl';

import './NewComment.scss';

type NewCommentProps = {
  className?: string;
};

export const NewComment: FC<NewCommentProps> = ({ className }) => {
  const { formatMessage: fm } = useIntl();

  const [createComment] = useCreateCommentMutation();

  const submitHandler = async () => {
    // FIXME удалить функцию, id передаётся только для json-server
    const randomize = () => Math.floor(Math.random() * 100000);

    await createComment(randomize());
  };

  return (
    <div className="new-comment">
      <Space className="new-comment__space" direction="vertical">
        <Typography.Title className="new-comment__title" level={3}>
          {fm(messages.newCommentName)}
        </Typography.Title>
        <Form className="new-comment__form" layout="vertical" onSubmitCapture={submitHandler}>
          <TextArea rows={DEFAULT_TEXTAREA_ROWS} />
          <Button className="new-comment__submit" htmlType="submit" type="primary">
            Send
          </Button>
        </Form>
      </Space>
    </div>
  );
};
