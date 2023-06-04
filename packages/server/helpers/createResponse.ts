import { ResponseApiError } from '../models/Api';
import { ResponseApiSuccess } from '../models/Api';

export const createErrorResponse = (code = 500, msg = 'Ошибка'): ResponseApiError => {
  return {
    status: false,
    error: {
      code,
      msg,
    },
  };
};



export const createSuccessResponse = (data: any): ResponseApiSuccess<any> => {
  return {
    status: true,
    data,
  };
};
