import { Request, Response, NextFunction } from 'express';
import { responseApi } from '../helpers';
import { createErrorResponse } from '../helpers';

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    // return next(); // Раскомментить для доступа без авторизации
    try {
        const auth = req.headers.auth as String ?? '';
        const [login, password] = auth.split('||');
        if (!login || !password) return responseApi(res, createErrorResponse(403, 'Клиент не авторизован'));
        const response = await fetch('https://ya-praktikum.tech/api/v2/auth/signin', { method: "POST", headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ login, password }) });

        if (response.status === 200) {
            next();
            return;
        } else {
            return responseApi(res, createErrorResponse(403, 'Клиент не авторизован'));
        }
    } catch (error: any) {
        return responseApi(res, createErrorResponse(500, error.message));
    }
}
