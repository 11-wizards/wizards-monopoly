import axios from 'axios';
import { API_URL, OWN_API_URL } from 'constants/main';

export const yandexApi = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

export const ownApi = axios.create({
  baseURL: OWN_API_URL,
});
