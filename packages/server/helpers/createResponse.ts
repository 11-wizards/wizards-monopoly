export type ApiError = {
  code: number;
  msg?: string;
};

export type ResponseApiError = {
  status: false;
  error: ApiError;
};

export type ResponseApiSuccess<T> = {
  status: true;
  data: T;
};

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
