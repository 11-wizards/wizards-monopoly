import { Button, Form, Space, Typography, Input } from 'antd';
import { useCreateCommentMutation } from 'api/forum.api';
import type { RootState } from 'app/store';
import classNames from 'classnames';
import { DEFAULT_TEXTAREA_ROWS, FORUM_TEXTAREA_MAX_LENGTH } from 'constants/forum';
import { useAppSelector } from 'hooks';
import type { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';
import { zodResolver } from '@hookform/resolvers/zod';
import DOMPurify from 'dompurify';
import { newCommentSchema } from './types';
import type { NewCommentSchema } from './types';
import { messages } from './common';

import './NewComment.scss';

type NewCommentProps = {
  topicId?: string;
};

const { TextArea } = Input;
const { Title } = Typography;

export const NewComment: FC<NewCommentProps> = ({ topicId }) => {
  const user = useAppSelector((state: RootState) => state.user.currentUser);
  const [createComment] = useCreateCommentMutation();
  const { formatMessage: fm } = useIntl();
  const {
    handleSubmit,
    control,
    reset,
    watch,
    formState: { isValid, isDirty },
  } = useForm<NewCommentSchema>({
    resolver: zodResolver(newCommentSchema),
  });

  const formValue = watch();

  const submitHandler = async ({ comment }: NewCommentSchema) => {
    if (user === null) {
      return;
    }

    await createComment({
      author: {
        author_id: user.id,
        name: user.displayName || user.login,
      },
      body: DOMPurify.sanitize(comment),
      topic_id: Number(topicId),
    }).then((res) => {
      if (!('error' in res)) {
        reset();
      }
    });
  };

  const isInvalidForm = !isValid;

  return (
    <div className="new-comment">
      <Space className="new-comment__space" direction="vertical">
        <Title className="new-comment__title" level={3}>
          {fm(messages.newComment)}
        </Title>
        <Form
          className="new-comment__form"
          layout="vertical"
          onSubmitCapture={handleSubmit(submitHandler)}
        >
          <Controller
            control={control}
            render={({ field }) => (
              <TextArea
                {...field}
                status={isInvalidForm && isDirty ? 'error' : ''}
                rows={DEFAULT_TEXTAREA_ROWS}
              />
            )}
            name="comment"
          />
          <footer className="new-comment__footer">
            {isDirty ? (
              <div className="new-comment__symbol-counter symbol-counter">
                <span
                  className={classNames('symbol-counter__dynamic-digit', {
                    'symbol-counter__dynamic-digit_invalid': isInvalidForm,
                  })}
                >
                  {formValue.comment?.length ?? 0}
                </span>
                <span> / {FORUM_TEXTAREA_MAX_LENGTH}</span>
              </div>
            ) : null}
            <Button
              className="new-comment__submit"
              htmlType="submit"
              type="primary"
              disabled={isInvalidForm}
            >
              {fm(messages.sendBtn)}
            </Button>
          </footer>
        </Form>
      </Space>
    </div>
  );
};
