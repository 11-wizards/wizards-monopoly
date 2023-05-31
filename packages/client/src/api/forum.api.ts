import { baseApi } from 'api/baseApi';
import type {
  Author,
  AuthorDTO,
  CommentDTO,
  Comment,
  Topic,
  TopicDTO,
  CreateTopicDTO,
  Reply,
  ReplyDTO,
} from 'models/forum.model';

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

const repliesNormalizr = (replies: ReplyDTO): Reply => ({
  author: authorNormalizr(replies.author),
  body: replies.body,
  commentId: replies.comment_id,
  date: replies.date,
  repliesId: replies.replies_id,
  topicId: replies.topic_id,
});

export const forumApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllTopics: build.query<Topic[], void>({
      query: () => ({
        url: `/topics`,
      }),
      transformResponse: (response: TopicDTO[]) => response.map(topicNormalizr),
    }),
    getTopic: build.query<Topic, number>({
      query: (id) => ({
        url: `/topics/${id}`,
      }),
      transformResponse: (response: TopicDTO) => topicNormalizr(response),
    }),
    createTopic: build.mutation<void, CreateTopicDTO>({
      query: ({ title, author, body }: CreateTopicDTO) => ({
        url: `/topics`,
        method: 'POST',
        body: {
          author,
          title,
          body,
        },
      }),
    }),
    getAllComments: build.query<Comment[], void>({
      query: () => ({
        url: '/comments',
      }),
      transformResponse: (response: CommentDTO[]) => response.map(commentNormalizr),
      providesTags: ['COMMENT'],
    }),
    createComment: build.mutation<void, Comment & { id: number }>({
      query: (id) => ({
        url: 'comments',
        method: 'POST',
        body: {
          id,
          author: {
            author_id: 3,
            author_name: 'User 3',
          },
          body: 'comment 1 user 3',
          comment_id: id,
          count_replies: 3,
          date: '31.05.23',
          topic_id: 12,
        },
      }),
      invalidatesTags: ['COMMENT'],
    }),
    getReplies: build.query<Reply[], void>({
      query: () => ({
        // TODO: подогнать под бэк
        // url: `/topics/${topicId}/comments/${commentId}/replies`,
        url: `/replies`,
      }),
      transformResponse: (response: ReplyDTO[]) => response.map(repliesNormalizr),
    }),
  }),
});

export const {
  useGetAllTopicsQuery,
  useGetTopicQuery,
  useGetAllCommentsQuery,
  useGetRepliesQuery,
  useCreateTopicMutation,
  useCreateCommentMutation,
} = forumApi;
