import { api } from 'api';
import { type CurrentUserDto } from 'models/auth.model';
import {
  type ProfileInput,
  ProfileInputDto,
  type ProfileChangePasswordInput,
  ProfileChangePasswordInputDto,
} from 'models/profile.model';

export const profileApi = {
  changeAvatar: (data: FormData) => api.put('/user/profile/avatar', data),
  changePassword: (data: ProfileChangePasswordInput) =>
    api.put('/user/password', new ProfileChangePasswordInputDto(data)),
  changeProfileInfo: (data: ProfileInput) =>
    api.put<CurrentUserDto>('/user/profile', new ProfileInputDto(data)),
};
