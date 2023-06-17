import { sanitizeObject } from 'helpers';
import { type FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { Controller, useForm } from 'react-hook-form';
import { Avatar, Button, Input, Modal, Typography } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { changeProfileInfo, signOut } from 'app/slices/userSlice';
import { API_URL } from 'constants/main';
import { ROUTES } from 'core/Router';
import { ProfileChangeAvatar } from 'features/Profile/ProfileChangeAvatar';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import type { ProfileInput } from 'models/profile.model';
import { messages } from './common';

import './ProfileForm.scss';

export const ProfileForm: FC = () => {
  const { formatMessage: fm } = useIntl();

  const dispatch = useAppDispatch();
  const { currentUser, isLoading } = useAppSelector((state) => state.user);

  const navigate = useNavigate();

  const [isModalAvatarOpen, setIsModalAvatarOpen] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const {
    control,
    handleSubmit,
    formState: { errors, touchedFields },
    reset,
  } = useForm<ProfileInput>({
    values: {
      firstName: currentUser?.firstName || '',
      secondName: currentUser?.secondName || '',
      displayName: currentUser?.displayName || '',
      login: currentUser?.login || '',
      email: currentUser?.email || '',
      phone: currentUser?.phone || '',
    },
  });

  const handleToggleChangeProfileAvatar = () => {
    setIsModalAvatarOpen((prevState) => !prevState);
  };

  const handleCancelEditing = () => {
    setIsEditing(false);
    reset();
  };

  const handleToggleEditing = () => {
    setIsEditing((prevState) => !prevState);
  };

  const handleChangePassword = () => {
    navigate(ROUTES.PROFILE_CHANGE_PASSWORD_PAGE.path);
  };

  const handleSignOut = async () => {
    await dispatch(signOut());

    navigate(ROUTES.LOGIN_PAGE.path);
  };

  async function onSubmit(values: ProfileInput) {
    const sanitizedValues = sanitizeObject(values);
    await dispatch(changeProfileInfo(sanitizedValues));

    setIsEditing(false);
  }

  const isSubmitDisabled =
    Object.values(touchedFields).length === 0 || Object.values(errors).length > 0;

  return (
    <>
      <div className="form-profile">
        <Typography.Title className="form-profile__title">
          {fm(messages.titleMain)}
        </Typography.Title>
        {currentUser && (
          <>
            <div className="form-profile__avatarContainer">
              <Avatar
                size={100}
                src={currentUser.avatar ? `${API_URL}/resources${currentUser.avatar}` : undefined}
                icon={<UserOutlined />}
                onClick={handleToggleChangeProfileAvatar}
                className="form-profile__avatar"
              />
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="form-profile__form">
              <div className="form-profile__input">
                <Controller
                  name="firstName"
                  control={control}
                  rules={{
                    required: fm(messages.validationRequiredField),
                  }}
                  render={({ field }) => (
                    <Input
                      placeholder={fm(messages.placeholderFirstName)}
                      disabled={!isEditing}
                      status={errors.firstName && 'error'}
                      {...field}
                    />
                  )}
                />
                {errors.firstName && (
                  <Typography.Text className="form-profile__inputError">
                    {errors.firstName.message}
                  </Typography.Text>
                )}
              </div>

              <div className="form-profile__input">
                <Controller
                  name="secondName"
                  control={control}
                  rules={{
                    required: fm(messages.validationRequiredField),
                  }}
                  render={({ field }) => (
                    <Input
                      placeholder={fm(messages.placeholderSecondName)}
                      disabled={!isEditing}
                      status={errors.secondName && 'error'}
                      {...field}
                    />
                  )}
                />
                {errors.secondName && (
                  <Typography.Text className="form-profile__inputError">
                    {errors.secondName.message}
                  </Typography.Text>
                )}
              </div>

              <div className="form-profile__input">
                <Controller
                  name="displayName"
                  control={control}
                  // rules={{}}
                  render={({ field }) => (
                    <Input
                      placeholder={fm(messages.placeholderDisplayName)}
                      disabled={!isEditing}
                      status={errors.displayName && 'error'}
                      {...field}
                    />
                  )}
                />
                {errors.displayName && (
                  <Typography.Text className="form-profile__inputError">
                    {errors.displayName.message}
                  </Typography.Text>
                )}
              </div>

              <div className="form-profile__input">
                <Controller
                  name="login"
                  control={control}
                  rules={{
                    required: fm(messages.validationRequiredField),
                  }}
                  render={({ field }) => (
                    <Input
                      placeholder={fm(messages.placeholderLogin)}
                      disabled={!isEditing}
                      status={errors.login && 'error'}
                      {...field}
                    />
                  )}
                />
                {errors.login && (
                  <Typography.Text className="form-profile__inputError">
                    {errors.login.message}
                  </Typography.Text>
                )}
              </div>

              <div className="form-profile__input">
                <Controller
                  name="email"
                  control={control}
                  rules={{
                    required: fm(messages.validationRequiredField),
                  }}
                  render={({ field }) => (
                    <Input
                      placeholder={fm(messages.placeholderEmail)}
                      disabled={!isEditing}
                      status={errors.email && 'error'}
                      {...field}
                    />
                  )}
                />
                {errors.email && (
                  <Typography.Text className="form-profile__inputError">
                    {errors.email.message}
                  </Typography.Text>
                )}
              </div>

              <div className="form-profile__input">
                <Controller
                  name="phone"
                  control={control}
                  rules={{
                    required: fm(messages.validationRequiredField),
                  }}
                  render={({ field }) => (
                    <Input
                      placeholder={fm(messages.placeholderPhone)}
                      disabled={!isEditing}
                      status={errors.phone && 'error'}
                      {...field}
                    />
                  )}
                />
                {errors.phone && (
                  <Typography.Text className="form-profile__inputError">
                    {errors.phone.message}
                  </Typography.Text>
                )}
              </div>
              {isEditing && (
                <div className="form-profile__editButtons">
                  <Button
                    onClick={handleCancelEditing}
                    type="primary"
                    danger
                    disabled={!isEditing || isLoading}
                    className="form-profile__editButton"
                  >
                    {fm(messages.buttonCancel)}
                  </Button>
                  <Button
                    htmlType="submit"
                    type="primary"
                    disabled={!isEditing || isSubmitDisabled || isLoading}
                    loading={isLoading}
                    className="form-profile__editButton"
                  >
                    {fm(messages.buttonSave)}
                  </Button>
                </div>
              )}
            </form>
          </>
        )}

        <div className="form-profile__profileStateButtons">
          <Button type="link" onClick={handleToggleEditing}>
            {fm(messages.buttonChangeProfileInfo)}
          </Button>
          <Button type="link" onClick={handleChangePassword}>
            {fm(messages.buttonChangePassword)}
          </Button>
          <Button type="text" danger onClick={handleSignOut}>
            {fm(messages.buttonSignout)}
          </Button>
        </div>
      </div>
      {isModalAvatarOpen && (
        <Modal open={isModalAvatarOpen} footer={null} onCancel={handleToggleChangeProfileAvatar}>
          <ProfileChangeAvatar onSuccess={handleToggleChangeProfileAvatar} />
        </Modal>
      )}
    </>
  );
};
