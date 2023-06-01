import { Button, Form, Space, Typography } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useCreateCommentMutation } from 'api/forum.api';
import type { RootState } from 'app/store';
import { DEFAULT_TEXTAREA_ROWS } from 'constants/forum';
import { randomize } from 'features/Forum/common';
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
  topicId: string;
};

export const NewComment: FC<NewCommentProps> = ({ topicId }) => {
  const { formatMessage: fm } = useIntl();

  const { handleSubmit, control } = useForm<FormValues>();

  const user = useAppSelector((state: RootState) => state.user.currentUser);

  const [createComment] = useCreateCommentMutation();

  const submitHandler = async (data: FormValues) => {
    if (user === null) {
      return;
    }

    // FIXME: удалить после интеграции с бэкендом
    await createComment({
      id: randomize(),
      author: {
        author_id: user.id,
        author_name: user.displayName || 'Anonymous',
      },
      body: data.comment,
      topic_id: Number(topicId),
      comment_id: randomize(),
    });

    // TODO: Интеграция с бэкендом
    // await createComment({
    //   author: {
    //     author_id: user?.id,
    //     authorName: user?.displayName,
    //   },
    //   body: data.body,
    //   topic_id: topicId,
    // });
  };

  return (
    <div className="new-comment">
      <Space className="new-comment__space" direction="vertical">
        <Typography.Title className="new-comment__title" level={3}>
          {fm(messages.newCommentName)}
        </Typography.Title>
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
