import { message } from 'antd';

export async function handleServerError(err: ServerError) {
  console.error({ err });

  await message.open({
    type: 'error',
    content: err.response?.data.reason,
  });
}
