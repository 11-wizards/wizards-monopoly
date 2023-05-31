import { isNumbers, isStrings } from '../helpers';
import { Author, TypeAuthor } from '../models/Author';
import { ErrorApi } from './api.error';

export const getAuthorDb = async (author: TypeAuthor) => {
  const { author_id, name } = author;
  let isAuthor = [];
  if (isNumbers(author_id)) {
    isAuthor = await Author.findAll({ where: { author_id } });
  }
  if (isAuthor.length) {
    return author_id;
  } else {
    return await createAuthorDb(name);
  }
};

export const createAuthorDb = async (name: string): Promise<number> => {
  if (!isStrings(name)) {
    throw new ErrorApi(400, 'Полученные данные не соответствуют модели');
  }
  const { author_id } = (await Author.create({ name })) as unknown as TypeAuthor;
  if (author_id) {
    return author_id;
  } else {
    throw new ErrorApi(500, 'Ошибка: Автор не найден и не может быть создан!');
  }
};
