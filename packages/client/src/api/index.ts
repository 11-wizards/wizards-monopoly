import axios from 'axios';
import { API_URL, YANDEX_API_URL } from 'constants/main';

export const api = axios.create({
  baseURL: API_URL,
});

export const yandexApi = axios.create({
  baseURL: YANDEX_API_URL,
  withCredentials: true,
});
