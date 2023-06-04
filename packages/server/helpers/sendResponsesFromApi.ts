import { Response } from 'express';
import { ResponseApi } from '../models/Api';

export const sendResponsesFromApi = async (res: Response, result: ResponseApi<unknown>): Promise<void> => {
  try {
    if (result.status) {
      res.json(result);
    } else {
      const {
        error: { code },
      } = result;
      res.status(code).json(result);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
