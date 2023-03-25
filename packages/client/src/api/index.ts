import axios from 'axios';
import { API_URL } from 'constants/main';

export const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});
