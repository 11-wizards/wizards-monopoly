import { OAuth } from 'features/OAuth/OAuth';
import { sanitizeObject } from 'helpers';
import type { FC } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { Controller, useForm } from 'react-hook-form';
import { Button, Input, Typography } from 'antd';
import { authApi } from 'api/auth.api';
import { fetchCurrentUser } from 'app/slices/userSlice';
import { LOCAL_STORAGE_IS_AUTH_KEY } from 'constants/localStorage';
import { ROUTES } from 'core/Router';
import { handleServerError } from 'helpers/handleServerError';
import { useAppDispatch } from 'hooks/redux';
import type { LoginInput } from 'models/auth.model';
import { messages } from './common';

import './Login.scss';

export const Login: FC = () => {
  const { formatMessage: fm } = useIntl();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>();

  async function onSubmit(values: LoginInput) {
    const sanitizedValues = sanitizeObject(values);

    try {
      const response = await authApi.logIn(sanitizedValues);

      if (response.status === 200) {
        localStorage.setItem(LOCAL_STORAGE_IS_AUTH_KEY, 'true');
        await dispatch(fetchCurrentUser());
        navigate(ROUTES.ROOT.path);
      }
    } catch (err) {
      handleServerError(err as ServerError);
    }
  }

  return (
    <div className="form-login">
      <Typography.Title className="form-login__title">{fm(messages.titleMain)}</Typography.Title>
      <Typography.Paragraph>{fm(messages.offerToRegisterViaOauth)}</Typography.Paragraph>
      <OAuth />
      <div className="form-login__separator">{fm(messages.separatorText)}</div>
      <form onSubmit={handleSubmit(onSubmit)} className="form-login__form">
        <div className="form-login__input">
          <Controller
            name="login"
            control={control}
            rules={{
              required: fm(messages.validationRequiredField),
              minLength: {
                value: 3,
                message: fm(messages.validationLoginMinLength),
              },
              maxLength: {
                value: 20,
                message: fm(messages.validationLoginMaxLength),
              },
            }}
            render={({ field }) => (
              <Input
                placeholder={fm(messages.placeholderLogin)}
                status={errors.login && 'error'}
                {...field}
              />
            )}
          />
          {errors.login && (
            <Typography.Text className="form-login__inputError">
              {errors.login.message}
            </Typography.Text>
          )}
        </div>

        <div className="form-login__input">
          <Controller
            name="password"
            control={control}
            rules={{
              required: fm(messages.validationRequiredField),
              minLength: {
                value: 4,
                message: fm(messages.validationPasswordMinLength),
              },
              maxLength: {
                value: 40,
                message: fm(messages.validationPasswordMaxLength),
              },
            }}
            render={({ field }) => (
              <Input.Password
                placeholder={fm(messages.placeholderPassword)}
                status={errors.password && 'error'}
                {...field}
              />
            )}
          />
          {errors.login && (
            <Typography.Text className="form-login__inputError">
              {errors.password?.message}
            </Typography.Text>
          )}
        </div>

        <Button htmlType="submit" type="primary" className="form-login__submitButton">
          {fm(messages.buttonLogin)}
        </Button>
      </form>

      <Typography.Paragraph className="form-login__redirect">
        {fm(messages.textNoAccount)}{' '}
        <Link to={ROUTES.REGISTER_PAGE.path} className="form-login__link">
          {fm(messages.buttonRegister)}
        </Link>
      </Typography.Paragraph>
    </div>
  );
};
