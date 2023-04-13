import { api } from 'api';
import {
  type CurrentUserDto,
  type LoginInput,
  LoginInputDto,
  type RegisterInput,
  RegisterInputDto,
} from 'models/auth.model';

export const authApi = {
  getCurrentUser: () => api.get<CurrentUserDto>('/auth/user'),
  logIn: (data: LoginInput) => api.post('/auth/signin', new LoginInputDto(data)),
  logOut: () => api.post('/auth/logout'),
  register: (data: RegisterInput) =>
    api.post<{ id: string }>('/auth/signup', new RegisterInputDto(data)),
};
