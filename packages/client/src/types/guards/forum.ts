import type { ResponseApiError } from 'models/forum.model';

export const isForumApiActionError = (data: any): data is ResponseApiError =>
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-return
  data?.data?.error?.msg ?? false;
