import { isRejectedWithValue } from '@reduxjs/toolkit';
import type { Middleware, AnyAction } from '@reduxjs/toolkit';
import { message } from 'antd';
import type { AppDispatch, RootState } from 'app/store';
import { isForumApiActionError } from 'types/guards/forum';

export const forumApiMacroErrorHandler: Middleware<unknown, RootState, AppDispatch> =
  () => (next: AppDispatch) => (action: AnyAction) => {
    if (isRejectedWithValue(action)) {
      if (isForumApiActionError(action?.payload)) {
        message.error('Ошибка на стороне сервера, попробуйте позже', 5);
      }
    }

    return next(action);
  };
