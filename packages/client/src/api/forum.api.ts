import { baseApi } from 'api/baseApi';
import type { Author, AuthorDTO, CommentDTO, Comment, Topic, TopicDTO } from 'models/forum.model';

const authorNormalizr = (author: AuthorDTO): Author => ({
  authorId: author.author_id,
  authorName: author.author_name,
});

const commentNormalizr = (comment: CommentDTO): Comment => ({
  author: authorNormalizr(comment.author),
  body: comment.body,
  commentId: comment.comment_id,
  repliesCount: comment.count_replies,
  topicId: comment.topic_id,
  date: comment.date,
});

const topicNormalizr = (topic: TopicDTO): Topic => ({
  author: authorNormalizr(topic.author),
  body: topic.body,
  commentsCount: topic?.counts_comments,
  date: topic.date,
  title: topic.title,
  topicId: topic.topic_id,
});

export const forumApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getTopics: build.query<Topic[], void>({
      query: () => ({
        url: `/topics`,
      }),
      // providesTags: [WISHLIST_TAG],
      transformResponse: (response: TopicDTO[]) => response.map(topicNormalizr),
      // transformResponse: (response: WishlistDto) => mapWishlist(response),
    }),
  }),
});

export const { useGetTopicsQuery } = forumApi;
