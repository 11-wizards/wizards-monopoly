import { isStringsArray } from '../helpers';
import { Author } from '../models/Author';
import { CreateTopicData, Topic, TypeTopic } from '../models/Topic';
import { ErrorApi } from './api.error';
import { getAuthorDb } from './author.service';
import { isObjectsArray } from '../helpers';

export const getTopicsDb = async (): Promise<Array<TypeTopic>> => {
  const data =
    ((await Topic.findAll({
      attributes: ['topic_id', 'title', 'body', 'date'],
      include: [
        {
          model: Author,
          as: 'author',
          attributes: ['name', 'author_id'],
        },
      ],
    })) as unknown as Array<TypeTopic>) ?? [];
  return data;
};

export const getTopicDb = async (topic_id: number): Promise<TypeTopic> => {
  const data =
    ((await Topic.findAll({
      where: { topic_id },
      attributes: ['topic_id', 'title', 'body', 'date'],
      include: [
        {
          model: Author,
          as: 'author',
          attributes: ['name', 'author_id'],
        },
      ],
    })) as unknown as Array<TypeTopic>) ?? [];
  if (data.length) {
    return data[0];
  } else {
    throw new ErrorApi(400, 'По данному id топик не найден');
  }
};

export const createTopicDb = async (topicData: CreateTopicData): Promise<number> => {
  const { author, title, body } = topicData ?? {};

  if (!isObjectsArray([author]) || !isStringsArray([title, body])) {
    throw new ErrorApi(400, 'Полученные данные не соответствуют модели');
  }

  const author_id = await getAuthorDb(author);

  const { topic_id } = (await Topic.create({ author_id, title, body })) as unknown as TypeTopic;

  if (topic_id) {
    return topic_id;
  } else {
    throw new ErrorApi(500, 'Ошибка при создании топика');
  }
};
