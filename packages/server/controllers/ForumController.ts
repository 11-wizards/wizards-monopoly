import { Request, Response, NextFunction } from 'express';
import { CreateTopicData, TypeTopic } from '../models/Topic';
import { createErrorResponse, createSuccessResponse, isNumbers } from '../helpers';
import { responseApi } from '../helpers';
import { createCommentDb, getCommentsDb } from '../services/comments.service';
import { createTopicDb, getTopicDb, getTopicsDb } from '../services/topic.services';
import { CreateCommentData, TypeComment } from '../models/Comment';

class ForumController {
  public async getTopics(_req: Request, res: Response, _next: NextFunction): Promise<void> {
    try {
      const data: Array<TypeTopic> = await getTopicsDb();
      responseApi(res, createSuccessResponse(data));
    } catch (error: any) {
      responseApi(res, createErrorResponse(error?.statusCode, error.message));
    }
  }

  public async getTopic(req: Request, res: Response, _next: NextFunction): Promise<void> {
    const topic_id = Number(req.params.topic_id);
    if (!isNumbers(topic_id)) {
      return responseApi(res, createErrorResponse(400, 'Неверный номер топика'));
    }
    try {
      const data: TypeTopic = await getTopicDb(topic_id);
      responseApi(res, createSuccessResponse(data));
    } catch (error: any) {
      responseApi(res, createErrorResponse(error?.statusCode, error.message));
    }
  }

  public async getComments(req: Request, res: Response, _next: NextFunction): Promise<void> {
    const topic_id = Number(req.params.topic_id);
    if (!isNumbers(topic_id)) {
      return responseApi(res, createErrorResponse(400, 'Неверный номер топика'));
    }
    try {
      const data: Array<TypeComment> = await getCommentsDb(topic_id);
      responseApi(res, createSuccessResponse(data));
    } catch (error: any) {
      responseApi(res, createErrorResponse(error?.statusCode, error.message));
    }
  }
  public async getRepliesComment(req: Request, res: Response, _next: NextFunction): Promise<void> {
    const topic_id = Number(req.params.topic_id);
    const comment_id = Number(req.params.comment_id);

    if (!isNumbers(topic_id, comment_id)) {
      return responseApi(res, createErrorResponse(400, 'Неверный номер топика или комментария'));
    }
    try {
      const data: Array<TypeComment> = await getCommentsDb(topic_id, comment_id);
      responseApi(res, createSuccessResponse(data));
    } catch (error: any) {
      responseApi(res, createErrorResponse(error?.statusCode, error.message));
    }
  }

  public async createTopic(req: Request, res: Response, _next: NextFunction): Promise<void> {
    try {
      const topicData: CreateTopicData = req.body;
      const result: number = await createTopicDb(topicData);
      responseApi(res, createSuccessResponse(result));
    } catch (error: any) {
      responseApi(res, createErrorResponse(error?.statusCode, error.message));
    }
  }

  public async createComment(req: Request, res: Response, _next: NextFunction): Promise<void> {
    const topic_id = Number(req.params.topic_id);
    if (!isNumbers(topic_id)) {
      return responseApi(res, createErrorResponse(400, 'Неверный номер топика'));
    }
    try {
      const commentData: CreateCommentData = req.body;
      const result: number = await createCommentDb(commentData, topic_id);
      responseApi(res, createSuccessResponse(result));
    } catch (error: any) {
      responseApi(res, createErrorResponse(error?.statusCode, error.message));
    }
  }

  public async createRepliesComment(
    req: Request,
    res: Response,
    _next: NextFunction,
  ): Promise<void> {
    const topic_id = Number(req.params.topic_id);
    const comment_id = Number(req.params.comment_id);
    if (!isNumbers(topic_id, comment_id)) {
      return responseApi(res, createErrorResponse(400, 'Неверный номер топика или комментария'));
    }
    try {
      const commentData: CreateCommentData = req.body;
      const result: number = await createCommentDb(commentData, topic_id, comment_id);
      responseApi(res, createSuccessResponse(result));
    } catch (error: any) {
      responseApi(res, createErrorResponse(error?.statusCode, error.message));
    }
  }

  public async errorPath(_req: Request, res: Response, _next: NextFunction): Promise<void> {
    responseApi(res, createErrorResponse(400, 'Неверный путь запроса'));
  }
}

export default new ForumController();
