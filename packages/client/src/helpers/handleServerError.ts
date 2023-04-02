import { message } from 'antd';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function handleServerError(err: any) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, no-console
  console.error({ err });
  await message.open({
    type: 'error',
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    content: err.response?.data?.reason,
  });
}
