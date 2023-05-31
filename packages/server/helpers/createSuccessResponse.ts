import { ResponseApiSuccess } from '../models/Api';

export const createSuccessResponse = (data: any): ResponseApiSuccess<any> => {
  return {
    status: true,
    data,
  };
};
