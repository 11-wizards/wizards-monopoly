import { isRejectedWithValue } from '@reduxjs/toolkit';
import type { Middleware, PayloadAction } from '@reduxjs/toolkit';
import { message } from 'antd';
import type { AppDispatch } from 'app/store';
import { isForumApiActionError } from 'types/guards/forum';

export const forumApiMacroErrorHandler: Middleware =
  () => (next: AppDispatch) => (action: PayloadAction<unknown>) => {
    if (isRejectedWithValue(action)) {
      if (isForumApiActionError(action?.payload?.data)) {
        console.log('911.', action);
        message.error('Ошибка на стороне сервера, попробуйте позже', 5);
      }
    }

    return next(action);
  };
