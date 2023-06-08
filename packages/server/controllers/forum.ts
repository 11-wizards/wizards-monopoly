import { Request, Response, NextFunction } from 'express';
import { CreateTopicData, TypeTopic } from '../models/Topic';
import { createErrorResponse, createSuccessResponse, isNumbersArray } from '../helpers';
import { sendResponsesFromApi } from '../helpers';
import { createCommentDb, getCommentsDb } from '../services/comments.service';
import { createTopicDb, getTopicDb, getTopicsDb } from '../services/topic.services';
import { CreateCommentData, TypeComment } from '../models/Comment';
import { ErrorApi } from '../services/api.error';
// import { ErrorApi, TypeErrorApi } from '../services/api.error';

class ForumController {
  public async getTopics(_req: Request, res: Response, _next: NextFunction): Promise<void> {
    try {
      const data: Array<TypeTopic> = await getTopicsDb();
      sendResponsesFromApi(res, createSuccessResponse(data));
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
  }

  public async getTopic(req: Request, res: Response, _next: NextFunction): Promise<void> {
    const topic_id = Number(req.params.topic_id);
    if (!isNumbersArray([topic_id])) {
      return sendResponsesFromApi(res, createErrorResponse(400, 'Неверный номер топика'));
    }
    try {
      const data: TypeTopic = await getTopicDb(topic_id);
      sendResponsesFromApi(res, createSuccessResponse(data));
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
  }

  public async getComments(req: Request, res: Response, _next: NextFunction): Promise<void> {
    const topic_id = Number(req.params.topic_id);
    if (!isNumbersArray([topic_id])) {
      return sendResponsesFromApi(res, createErrorResponse(400, 'Неверный номер топика'));
    }
    try {
      const data: Array<TypeComment> = await getCommentsDb(topic_id);
      sendResponsesFromApi(res, createSuccessResponse(data));
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
  }
  public async getRepliesComment(req: Request, res: Response, _next: NextFunction): Promise<void> {
    const topic_id = Number(req.params.topic_id);
    const comment_id = Number(req.params.comment_id);

    if (!isNumbersArray([topic_id, comment_id])) {
      return sendResponsesFromApi(
        res,
        createErrorResponse(400, 'Неверный номер топика или комментария'),
      );
    }
    try {
      const data: Array<TypeComment> = await getCommentsDb(topic_id, comment_id);
      sendResponsesFromApi(res, createSuccessResponse(data));
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
  }

  public async createTopic(req: Request, res: Response, _next: NextFunction): Promise<void> {
    try {
      const topicData: CreateTopicData = req.body;
      const result: number = await createTopicDb(topicData);
      sendResponsesFromApi(res, createSuccessResponse(result));
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
  }

  public async createComment(req: Request, res: Response, _next: NextFunction): Promise<void> {
    const topic_id = Number(req.params.topic_id);
    if (!isNumbersArray([topic_id])) {
      return sendResponsesFromApi(res, createErrorResponse(400, 'Неверный номер топика'));
    }
    try {
      const commentData: CreateCommentData = req.body;
      const result: number = await createCommentDb(commentData, topic_id);
      sendResponsesFromApi(res, createSuccessResponse(result));
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
  }

  public async createRepliesComment(
    req: Request,
    res: Response,
    _next: NextFunction,
  ): Promise<void> {
    const topic_id = Number(req.params.topic_id);
    const comment_id = Number(req.params.comment_id);
    if (!isNumbersArray([topic_id, comment_id])) {
      return sendResponsesFromApi(
        res,
        createErrorResponse(400, 'Неверный номер топика или комментария'),
      );
    }
    try {
      const commentData: CreateCommentData = req.body;
      const result: number = await createCommentDb(commentData, topic_id, comment_id);
      sendResponsesFromApi(res, createSuccessResponse(result));
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
  }

  public async errorPath(_req: Request, res: Response, _next: NextFunction): Promise<void> {
    sendResponsesFromApi(res, createErrorResponse(400, 'Неверный путь запроса'));
  }
}

export default new ForumController();
