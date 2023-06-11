import { backendApi } from 'api/backend.api';
import { API_TAGS } from 'constants/forum';
import type {
  Comment,
  CommentDTO,
  NewCommentResponse,
  NewTopicResponse,
  Reply,
  ReplyDTO,
  ResponseApiSuccess,
  Topic,
  TopicDTO,
} from 'models/forum.model';
import { commentNormalizr, repliesNormalizr, topicNormalizr } from 'features/Forum/common';
import { ForumApiHandlers } from 'types/enums/forum';

export const forumApi = backendApi.injectEndpoints({
  endpoints: (build) => ({
    getAllTopics: build.query<Topic[], void>({
      query: () => ({
        url: ForumApiHandlers.Topics,
      }),
      transformResponse: (response: ResponseApiSuccess<TopicDTO[]>): Topic[] =>
        response.data.map(topicNormalizr),
      providesTags: [API_TAGS.TOPICS],
    }),

    getTopic: build.query<Topic, number>({
      query: (topicId) => ({
        url: `${ForumApiHandlers.Topics}/${topicId}`,
      }),
      transformResponse: (response: ResponseApiSuccess<TopicDTO>): Topic =>
        topicNormalizr(response.data),
    }),

    createTopic: build.mutation<void, NewTopicResponse>({
      query: ({ title, author, body, topic_id }: NewTopicResponse) => ({
        url: ForumApiHandlers.Topics,
        method: 'POST',
        body: {
          author,
          title,
          body,
          topic_id,
        },
      }),
      invalidatesTags: [API_TAGS.TOPICS],
    }),

    getAllComments: build.query<Comment[], string>({
      query: (topicId) => ({
        url: `${ForumApiHandlers.Topics}/${topicId}/${ForumApiHandlers.Comments}`,
      }),
      transformResponse: (response: ResponseApiSuccess<CommentDTO[]>): Comment[] =>
        response.data.map(commentNormalizr),
      providesTags: [API_TAGS.COMMENTS],
    }),

    createComment: build.mutation<void, NewCommentResponse>({
      query: ({ author, body, topic_id: topicId }: NewCommentResponse) => ({
        url: `/sd23/s${ForumApiHandlers.Topics}/${topicId}/${ForumApiHandlers.Comments}`,
        method: 'POST',
        body: {
          author,
          body,
          topic_id: topicId,
        },
      }),
      invalidatesTags: [API_TAGS.COMMENTS],
    }),

    getReplies: build.query<Reply[], { commentId: string; topicId: string }>({
      query: ({ commentId, topicId }) => ({
        url: `${ForumApiHandlers.Topics}/${topicId}/${ForumApiHandlers.Comments}/${commentId}/${ForumApiHandlers.Replies}`,
      }),
      transformResponse: (response: ResponseApiSuccess<ReplyDTO[]>): Reply[] =>
        response.data.map(repliesNormalizr),
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
