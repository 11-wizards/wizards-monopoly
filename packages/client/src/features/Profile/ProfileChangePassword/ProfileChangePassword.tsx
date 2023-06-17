import { sanitizeObject } from 'helpers';
import { useState, type FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { Controller, useForm } from 'react-hook-form';
import { Button, Input, Typography } from 'antd';
import { profileApi } from 'api/profile.api';
import { ROUTES } from 'core/Router';
import { handleServerError } from 'helpers/handleServerError';
import type { ProfileChangePasswordInput } from 'models/profile.model';
import { messages } from './common';

import './ProfileChangePassword.scss';

export const ProfileChangePassword: FC = () => {
  const { formatMessage: fm } = useIntl();

  const navigate = useNavigate();

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const {
    control,
    handleSubmit,
    formState: { errors, touchedFields },
    reset,
  } = useForm<ProfileChangePasswordInput>();

  const handleCancelChangePassword = () => {
    reset();

    navigate(-1);
  };

  async function onSubmit(values: ProfileChangePasswordInput) {
    setIsSubmitting(true);
    const sanitizedValues = sanitizeObject(values);

    try {
      const response = await profileApi.changePassword(sanitizedValues);

      if (response.status === 200) {
        reset();

        navigate(ROUTES.PROFILE_PAGE.path);
      }
    } catch (err) {
      handleServerError(err as ServerError);
    }

    setIsSubmitting(false);
  }

  const isButtonsDisabled =
    Object.values(touchedFields).length === 0 || Object.values(errors).length > 0;

  return (
    <div className="wrapper_profilePage">
      <div className="form-change-password">
        <Typography.Title>{fm(messages.titleMain)}</Typography.Title>
        <form onSubmit={handleSubmit(onSubmit)} className="form-change-password__form">
          <div className="form-change-password__input">
            <Controller
              name="oldPassword"
              control={control}
              rules={{
                required: fm(messages.validationRequiredField),
              }}
              render={({ field }) => (
                <Input.Password
                  placeholder={fm(messages.placeholderOldPassword)}
                  status={errors.oldPassword && 'error'}
                  {...field}
                />
              )}
            />
            {errors.oldPassword && (
              <Typography.Text className="form-change-password__inputError">
                {errors.oldPassword?.message}
              </Typography.Text>
            )}
          </div>

          <div className="form-change-password__input">
            <Controller
              name="newPassword"
              control={control}
              rules={{
                required: fm(messages.validationRequiredField),
              }}
              render={({ field }) => (
                <Input.Password
                  placeholder={fm(messages.placeholderNewPassword)}
                  status={errors.newPassword && 'error'}
                  {...field}
                />
              )}
            />
            {errors.newPassword && (
              <Typography.Text className="form-change-password__inputError">
                {errors.newPassword.message}
              </Typography.Text>
            )}
          </div>

          <div className="form-change-password__buttons">
            <Button
              type="primary"
              danger
              onClick={handleCancelChangePassword}
              disabled={isButtonsDisabled}
              className="form-change-password__button"
            >
              {fm(messages.buttonCancel)}
            </Button>
            <Button
              htmlType="submit"
              type="primary"
              disabled={isButtonsDisabled || isSubmitting}
              loading={isSubmitting}
              className="form-change-password__button"
            >
              {fm(messages.buttonSave)}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
