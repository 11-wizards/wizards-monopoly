import { ResponseApiError } from '../models/Api';

export const createErrorResponse = (code = 500, msg = 'Ошибка'): ResponseApiError => {
  return {
    status: false,
    error: {
      code,
      msg,
    },
  };
};
