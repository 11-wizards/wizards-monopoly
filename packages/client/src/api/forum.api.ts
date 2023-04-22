import axios from 'axios';

export const forumApi = {
  getAuthor: () => axios.get('https://jsonplaceholder.typicode.com/users'),
  getTopics: () => axios.get('https://jsonplaceholder.typicode.com/posts'),
  // getPosts: (id: number) => axios.get(`https://jsonplaceholder.typicode.com/posts/${id}/comments`),
  getPosts: () => axios.get(`https://jsonplaceholder.typicode.com/comments`),
};
