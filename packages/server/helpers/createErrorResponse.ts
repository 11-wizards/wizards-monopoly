import { ResponseApiError } from "../models/Api"

export const createErrorResponse = (code: number = 500, msg: string = 'Ошибка'): ResponseApiError => {
    return {
        status: false,
        error: {
            code,
            msg
        }
    }
}