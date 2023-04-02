import axios from 'axios';
import { Post } from 'models/forum.model';

export const forumApi = {
    getAuthor: () => axios.get('https://jsonplaceholder.typicode.com/users'),
    getThemes: () => axios.get('https://jsonplaceholder.typicode.com/posts'),
    // getPosts: (id: number) => axios.get(`https://jsonplaceholder.typicode.com/posts/${id}/comments`),
    getPosts: (id: number) => axios.get(`https://jsonplaceholder.typicode.com/comments`),
};

