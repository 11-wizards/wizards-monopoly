import { api } from 'api';
import { type LoginInput, LoginInputDto } from 'models/auth.model';

export const authApi = {
  login: (data: LoginInput) => api.post('/auth/signin', new LoginInputDto(data)),
};
