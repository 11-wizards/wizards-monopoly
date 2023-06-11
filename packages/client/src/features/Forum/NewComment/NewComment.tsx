import { Button, Form, Space, Typography, Input } from 'antd';
import { useCreateCommentMutation } from 'api/forum.api';
import type { RootState } from 'app/store';
import { DEFAULT_TEXTAREA_ROWS } from 'constants/forum';
import { useAppSelector } from 'hooks';
import { messages } from 'pages/TopicPage/common';
import type { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';

import './NewComment.scss';

type FormValues = {
  comment: string;
};

type NewCommentProps = {
  topicId?: string;
};

const { TextArea } = Input;
const { Title } = Typography;

export const NewComment: FC<NewCommentProps> = ({ topicId }) => {
  const { formatMessage: fm } = useIntl();
  const { handleSubmit, control, reset } = useForm<FormValues>();
  const user = useAppSelector((state: RootState) => state.user.currentUser);
  const [createComment] = useCreateCommentMutation();

  console.log('911.', control);

  const submitHandler = async (data: FormValues) => {
    await createComment({
      author: {
        author_id: user.id,
        name: user.displayName || 'Anonymous',
      },
      body: data.comment,
      topic_id: Number(topicId),
    }).then(() => reset());
  };

  return (
    <div className="new-comment">
      <Space className="new-comment__space" direction="vertical">
        <Title className="new-comment__title" level={3}>
          {fm(messages.newCommentName)}
        </Title>
        <Form
          className="new-comment__form"
          layout="vertical"
          onSubmitCapture={handleSubmit(submitHandler)}
        >
          <Controller
            control={control}
            render={({ field }) => <TextArea {...field} rows={DEFAULT_TEXTAREA_ROWS} />}
            name="comment"
          />
          <Button className="new-comment__submit" htmlType="submit" type="primary">
            Send
          </Button>
        </Form>
      </Space>
    </div>
  );
};
