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
            const data = await getTopicsDb() as Array<TypeTopic>;
            responseApi(res, createSuccessResponse(data));
        } catch (error: any) {
            responseApi(res, createErrorResponse(error?.statusCode, error.message));
        }
    }

    public async getTopic(req: Request, res: Response, _next: NextFunction): Promise<void> {
        const topic_id = Number(req.params.topic_id);
        if (!isNumbers(topic_id)) return responseApi(res, createErrorResponse(400, 'Неверный номер топика'));
        try {
            const data = await getTopicDb(topic_id) as TypeTopic;
            responseApi(res, createSuccessResponse(data));
        } catch (error: any) {
            responseApi(res, createErrorResponse(error?.statusCode, error.message));
        }
    }

    public async getComments(req: Request, res: Response, _next: NextFunction): Promise<void> {
        const topic_id = Number(req.params.topic_id);
        if (!isNumbers(topic_id)) return responseApi(res, createErrorResponse(400, 'Неверный номер топика'));
        try {
            const data = await getCommentsDb(topic_id) as Array<TypeComment>;
            responseApi(res, createSuccessResponse(data));
        } catch (error: any) {
            responseApi(res, createErrorResponse(error?.statusCode, error.message));
        }
    }
    public async getRepliesComment(req: Request, res: Response, _next: NextFunction): Promise<void> {
        const topic_id = Number(req.params.topic_id);
        const comment_id = Number(req.params.comment_id);

        if (!isNumbers(topic_id, comment_id)) return responseApi(res, createErrorResponse(400, 'Неверный номер топика или комментария'));
        try {
            const data = await getCommentsDb(topic_id, comment_id) as Array<TypeComment>;
            responseApi(res, createSuccessResponse(data));
        } catch (error: any) {
            responseApi(res, createErrorResponse(error?.statusCode, error.message));
        }
    }

    public async createTopic(req: Request, res: Response, _next: NextFunction): Promise<void> {
        try {
            const topicData = req.body as CreateTopicData;
            const result = await createTopicDb(topicData) as number;
            responseApi(res, createSuccessResponse(result));
        } catch (error: any) {
            responseApi(res, createErrorResponse(error?.statusCode, error.message));
        }
    }

    public async createComment(req: Request, res: Response, _next: NextFunction): Promise<void> {
        const topic_id = Number(req.params.topic_id);
        if (!isNumbers(topic_id)) return responseApi(res, createErrorResponse(400, 'Неверный номер топика'));
        try {
            const commentData = req.body as CreateCommentData;
            const result = await createCommentDb(commentData, topic_id) as number;
            responseApi(res, createSuccessResponse(result));
        } catch (error: any) {
            responseApi(res, createErrorResponse(error?.statusCode, error.message));
        }
    }

    public async createRepliesComment(req: Request, res: Response, _next: NextFunction): Promise<void> {
        const topic_id = Number(req.params.topic_id);
        const comment_id = Number(req.params.comment_id);
        if (!isNumbers(topic_id, comment_id)) return responseApi(res, createErrorResponse(400, 'Неверный номер топика или комментария'));
        try {
            const commentData = req.body as CreateCommentData;
            const result = await createCommentDb(commentData, topic_id, comment_id) as number;
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


