import { Request, Response, NextFunction } from 'express';

export type ApiError = {
    code: number,
    msg?: string,
}

export type ResponseApiSuccess<T> = {
    status: true,
    data: T,
}
export type ResponseApiError = {
    status: false,
    error: ApiError,
}

export type ResponseApi<T> = ResponseApiSuccess<T> | ResponseApiError;

export type RoutesFunction<T> = (req: Request, res: Response, next: NextFunction) => Promise<ResponseApi<T>>;