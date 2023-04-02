import type { FC } from 'react';
import { Link } from 'react-router-dom';
import { defineMessages, useIntl } from 'react-intl';
import { Controller, useForm } from 'react-hook-form';
import { Button, Input, Typography } from 'antd';
import { authApi } from 'api/auth.api';
import { LOCAL_STORAGE_IS_AUTH_KEY } from 'constants/localStorage';
import { ROUTES } from 'core/Router';
import { handleServerError } from 'helpers/handleServerError';
import type { LoginInput } from 'models/auth.model';

import './Login.scss';

const messages = defineMessages({
  buttonLogin: { id: 'auth.button.login', defaultMessage: 'Login' },
  buttonRegister: { id: 'auth.button.register', defaultMessage: 'Register' },
  placeholderLogin: { id: 'auth.placeholder.login', defaultMessage: 'Login' },
  placeholderPassword: {
    id: 'auth.placeholder.password',
    defaultMessage: 'Password',
  },
  textNoAccount: { id: 'auth.text.no-account', defaultMessage: 'No account?' },
  titleMain: { id: 'auth.title.login', defaultMessage: 'Login' },
  validationLoginMaxLength: {
    id: 'validation.max-length.login',
    defaultMessage: 'Login cannot be longer than 20 characters',
  },
  validationLoginMinLength: {
    id: 'validation.min-length.login',
    defaultMessage: 'Login must be at least 4 characters',
  },
  validationPasswordMaxLength: {
    id: 'validation.max-length.password',
    defaultMessage: 'Password cannot be longer than 40 characters',
  },
  validationPasswordMinLength: {
    id: 'validation.min-length.password',
    defaultMessage: 'Password must be at least 4 characters',
  },
  validationRequiredField: {
    id: 'validation.required-field',
    defaultMessage: 'This field is required',
  },
});

export const Login: FC = () => {
  const { formatMessage: fm } = useIntl();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>();

  async function onSubmit(values: LoginInput) {
    try {
      const response = await authApi.logIn(values);
      // eslint-disable-next-line no-console
      console.log({ response });

      if (response.status === 200) {
        localStorage.setItem(LOCAL_STORAGE_IS_AUTH_KEY, 'true');
      }
    } catch (err) {
      await handleServerError(err);
    }
  }

  return (
    <div className="form-login">
      <Typography.Title>{fm(messages.titleMain)}</Typography.Title>
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

      <div>
        <Typography.Text>{fm(messages.textNoAccount)} </Typography.Text>
        <Link to={ROUTES.REGISTER_PAGE.path} className="form-login__link">
          <Typography.Text className="form-login__linkText">
            {fm(messages.buttonRegister)}
          </Typography.Text>
        </Link>
      </div>
    </div>
  );
};
