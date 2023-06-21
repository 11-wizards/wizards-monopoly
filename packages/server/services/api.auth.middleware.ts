import { Request, Response, NextFunction } from 'express';
import { sendResponsesFromApi } from '../helpers';
import { createErrorResponse } from '../helpers';
import { ErrorApi } from './api.error';

export const authMiddleware = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    // FIXME: для доступа без авторизации
    return next();

    const auth = (req.headers.auth as string) ?? '';
    const [login, password] = auth.split('||');
    if (!login || !password) {
      return sendResponsesFromApi(res, createErrorResponse(403, 'Клиент не авторизован'));
    }
    const response = await fetch('https://ya-praktikum.tech/api/v2/auth/signin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ login, password }),
    });

    if (response.status === 200) {
      next();
      return;
    } else {
      return sendResponsesFromApi(res, createErrorResponse(403, 'Клиент не авторизован'));
    }
  } catch (error: unknown) {
    let statusCode = 500;
    let mgs = 'Произошла ошибка';

    if (error instanceof Error) {
      mgs = error.message;
    }
    if (error instanceof ErrorApi) {
      statusCode = error.statusCode;
    }
    sendResponsesFromApi(res, createErrorResponse(statusCode, mgs));
  }
};
