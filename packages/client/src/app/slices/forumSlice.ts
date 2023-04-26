import type { PayloadAction } from '@reduxjs/toolkit';
import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';
import type { Author, Topic, Post } from 'models/forum.model';
import { ForumNewPost, ForumNewTopic } from 'models/forum.model';
import { forumApi } from 'api/forum.api';
import type { RootState } from '../store';

type ForumState = {
  authors: Author[];
  currentPage: number;
  currentTopic: Nullable<Topic>;
  isLoading: boolean;
  posts: Post[];
  topics: Topic[];
};

const initialState: ForumState = {
  currentTopic: null,
  topics: [],
  authors: [],
  posts: [],
  currentPage: 1,
  isLoading: false,
};

export const fetchTopics = createAsyncThunk('forum/fetchTopics', async () => {
  const response = await forumApi.getTopics();
  if (response.status === 200) {
    return response.data as Topic[];
  }

  return null;
});

export const fetchPosts = createAsyncThunk('forum/fetchPosts', async () => {
  const response = await forumApi.getPosts();
  if (response.status === 200) {
    return response.data as Post[];
  }

  return null;
});

export const ITEMS_PER_PAGE = 30;

export const forumSlice = createSlice({
  name: 'forum',
  initialState,
  reducers: {
    addNewTopic: (state: ForumState, action: PayloadAction<string>) => {
      const firstTopicId: number =
        typeof state.topics[0]?.id === 'number' ? state.topics[0]?.id : 0;
      const newThemeId: number = firstTopicId + 1;
      const newTopicName = action.payload;

      const topic = new ForumNewTopic(newTopicName, 1, newThemeId);
      state.topics.unshift(topic);
    },
    addNewPost: (state: ForumState, action: PayloadAction<string>) => {
      const { currentTopic } = state;
      if (currentTopic === null) return;

      const newPostName = action.payload;
      const post = new ForumNewPost(1, newPostName, currentTopic.id);
      state.posts.push(post);
    },
    setCurrentTopic: (state: ForumState, action: PayloadAction<Topic>) => {
      state.currentTopic = action.payload;
    },
    setCurrentPage: (state: ForumState, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.fulfilled, (state: ForumState, action) => {
        state.isLoading = false;
        const posts = action.payload;
        if (posts !== null) {
          state.posts = posts;
        }
      })
      .addCase(fetchPosts.pending, (state: ForumState) => {
        state.isLoading = true;
      })
      .addCase(fetchPosts.rejected, (state: ForumState) => {
        state.isLoading = false;
      });

    builder
      .addCase(fetchTopics.fulfilled, (state: ForumState, action) => {
        state.isLoading = false;
        const topics = action.payload;
        if (topics !== null) {
          state.topics = topics;
        }
      })
      .addCase(fetchTopics.pending, (state: ForumState) => {
        state.isLoading = true;
      })
      .addCase(fetchTopics.rejected, (state: ForumState) => {
        state.isLoading = false;
      });
  },
});

export const selectTopics = (rootState: RootState) => rootState.forum.topics;
export const selectCurrentTopic = (rootState: RootState) => rootState.forum.currentTopic;
export const selectPosts = (rootState: RootState) => rootState.forum.posts;
export const selectAuthors = (rootState: RootState) => rootState.forum.authors;
export const selectCurrentPage = (rootState: RootState) => rootState.forum.currentPage;
export const selectMaxPages = createSelector(
  (rootState: RootState) => rootState.forum.posts,
  (posts) => Math.ceil(posts.length / ITEMS_PER_PAGE),
);
export const selectCurrentPageData = createSelector(
  (rootState: RootState) => rootState.forum.posts,
  (rootState: RootState) => rootState.forum.currentPage,
  (posts, currentPage) => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;

    return posts.slice(start, end);
  },
);

export const { addNewTopic, addNewPost, setCurrentTopic, setCurrentPage } = forumSlice.actions;

export default forumSlice.reducer;
