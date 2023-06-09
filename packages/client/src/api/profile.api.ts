import { yandexApi } from 'api';
import { type CurrentUserDto } from 'models/auth.model';
import {
  type ProfileInput,
  ProfileInputDto,
  type ProfileChangePasswordInput,
  ProfileChangePasswordInputDto,
} from 'models/profile.model';

export const profileApi = {
  changeAvatar: (data: FormData) => yandexApi.put('/user/profile/avatar', data),
  changePassword: (data: ProfileChangePasswordInput) =>
    yandexApi.put('/user/password', new ProfileChangePasswordInputDto(data)),
  changeProfileInfo: (data: ProfileInput) =>
    yandexApi.put<CurrentUserDto>('/user/profile', new ProfileInputDto(data)),
};
