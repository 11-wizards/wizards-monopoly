export type Comment = {
  body: string;
  id: number;
  repliesCount?: number;
  title: string;
  user: Author;
};

export type Author = {
  id: string;
  name: string;
};

export type Topic = {
  body?: string;
  comments?: Comment[];
  id: number;
  title: string;
  user: Author;
};

export type PreviewTopic = {
  commentsCount?: number;
  desc: string;
} & Omit<Topic, 'body' | 'comments'>;
