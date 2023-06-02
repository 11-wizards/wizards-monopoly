import { baseApi } from 'api/baseApi';
import type {
  Comment,
  CommentDTO,
  NewTopicResponse,
  Reply,
  ReplyDTO,
  Topic,
  TopicDTO,
} from 'models/forum.model';
import { commentNormalizr, repliesNormalizr, topicNormalizr } from 'models/forum.model';
import { ForumApiHandlers } from 'types/enums/forum';

export const forumApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllTopics: build.query<Topic[], void>({
      query: () => ({
        url: ForumApiHandlers.Topics,
      }),
      transformResponse: (response: TopicDTO[]): Topic[] => response.map(topicNormalizr),
      providesTags: ['TOPICS'],
    }),

    getTopic: build.query<Topic, number>({
      query: (id) => ({
        url: `${ForumApiHandlers.Topics}/${id}`,
      }),
      transformResponse: (response: TopicDTO): Topic => topicNormalizr(response),
    }),

    createTopic: build.mutation<void, NewTopicResponse & { id: number }>({
      query: ({ title, author, body, id, topic_id }) => ({
        url: ForumApiHandlers.Topics,
        method: 'POST',
        body: {
          id,
          author,
          title,
          body,
          topic_id,
        },
      }),
      invalidatesTags: ['TOPICS'],
    }),

    getAllComments: build.query<Comment[], void>({
      query: () => ({
        url: ForumApiHandlers.Comments,
      }),
      transformResponse: (response: CommentDTO[]): Comment[] => response.map(commentNormalizr),
      providesTags: ['COMMENTS'],
    }),

    createComment: build.mutation<
      void,
      Omit<CommentDTO, 'count_replies' | 'date'> & { id: number }
    >({
      query: ({ id, author, body, topic_id, comment_id }) => ({
        url: ForumApiHandlers.Comments,
        method: 'POST',
        body: {
          id,
          author,
          body,
          topic_id,
          date: new Date().toDateString(),
          comment_id,
        },
      }),
      invalidatesTags: ['COMMENTS'],
    }),

    getReplies: build.query<Reply[], null>({
      query: () => ({
        url: ForumApiHandlers.Replies,
      }),
      transformResponse: (response: ReplyDTO[]): Reply[] => response.map(repliesNormalizr),
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
