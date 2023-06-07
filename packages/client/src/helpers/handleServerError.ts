import { message } from 'antd';

export function handleServerError(err: ServerError) {
  message.open({
    type: 'error',
    content: err.response?.data.reason,
  });
}
