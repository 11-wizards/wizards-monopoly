export type Author = {
  email: string;
  id: number;
  name: string;
};

export type Comment = {
  body: string;
  id: number;
  userId: number;
};

export type Topic = {
  body?: string;
  comments?: Comment[];
  id: number;
  isFav?: boolean;
  title: string;
  userId: number;
};

export type Post = {
  body: string;
  email: string;
  id: number;
  name: string;
  postId: number;
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
