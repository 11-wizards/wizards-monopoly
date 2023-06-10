import { yandexApi } from 'api';
import {
  type CurrentUserDto,
  type LoginInput,
  LoginInputDto,
  type RegisterInput,
  RegisterInputDto,
} from 'models/auth.model';

export const authApi = {
  getCurrentUser: () => yandexApi.get<CurrentUserDto>('/auth/user'),
  logIn: (data: LoginInput) => yandexApi.post('/auth/signin', new LoginInputDto(data)),
  logOut: () => yandexApi.post('/auth/logout'),
  register: (data: RegisterInput) =>
    yandexApi.post<{ id: string }>('/auth/signup', new RegisterInputDto(data)),
};
