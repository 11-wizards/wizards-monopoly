import { api } from 'api';
import { type LoginInput, LoginInputDto, type CurrentUserDto } from 'models/auth.model';

export const authApi = {
  getCurrentUser: () => api.get<CurrentUserDto>('/auth/user'),
  logIn: (data: LoginInput) => api.post('/auth/signin', new LoginInputDto(data)),
  logOut: () => api.post('/auth/logout'),
};
