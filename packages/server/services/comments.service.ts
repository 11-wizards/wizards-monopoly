import {  isObjects, isStrings } from "../helpers";
import { Author } from "../models/Author";
import { Comment, CreateCommentData, TypeComment } from "../models/Comment";
import {  getAuthorDb } from "./author.service";
import { ErrorApi } from "./api.error";

export const getCommentsDb = async (topic_id: number, parent_comment_id: number | null = null): Promise<Array<TypeComment>> => {
    const data = await Comment.findAll({
        where: { topic_id, parent_comment_id },
        attributes: ['topic_id', 'comment_id', 'parent_comment_id', 'body', 'date'],
        include: [{
            model: Author,
            as: 'author',
            attributes: ['name', 'author_id']
        }]
    }) as unknown as Array<TypeComment> ?? [];
    if (data) {
        return data;
    } else {
        throw new ErrorApi(500, 'Ошибка при запросе комментариев');
    }
}


export const createCommentDb = async (commentData: CreateCommentData, topic_id: number, parent_comment_id: number | null = null): Promise<number> => {
    const { author, body } = commentData ?? {};

    if (!isObjects(author) || !isStrings(body)) {
        throw new ErrorApi(400, 'Полученные данные не соответствуют модели');
    }

    const author_id = await getAuthorDb(author);

    const { comment_id } = await Comment.create({ topic_id, author_id, parent_comment_id, body }) as unknown as TypeComment;

    if (comment_id) {
        return comment_id;
    } else {
        throw new ErrorApi(500, 'Ошибка при создании Комментария');
    }
}
