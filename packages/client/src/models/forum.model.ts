export type Author = {
  id: number;
  name: string;
  email: string;
};

export type Topic = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export type Post = {
  postId: number;
  name: string;
  id: number;
  email: string;
  body: string;
};

export class ForumNewTopic {
  userId: number;
  id: number;
  title: string;
  body = 'В данной теме пока нет сообщений.';

  constructor(title: string, userId: number, id: number) {
    this.userId = userId;
    this.title = title;
    this.id = id;
  }
}

export class ForumNewPost {
  postId: number;
  id = 0;
  name: string;
  email: string;
  body: string;

  constructor(userId: number, body: string, postId: number) {
    this.name = 'Заголовок';
    this.body = body;
    this.email = 'Автор';
    this.postId = postId;
  }
}