import type { FC } from 'react';
import { Link } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { Controller, useForm } from 'react-hook-form';
import { Button, Input, Typography } from 'antd';
import { ROUTES } from 'core/Router';
import type { RegisterInput } from 'models/auth.model';
import { messages } from './common';

import './Register.scss';

const mockAwait = <T,>(values: T): Promise<T> => Promise.resolve(values);

export const Register: FC = () => {
  const { formatMessage: fm } = useIntl();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInput>();

  async function onSubmit(values: RegisterInput) {
    const response = await mockAwait<RegisterInput>(values);

    console.log({ response });
  }

  return (
    <div className="form-register">
      <Typography.Title>{fm(messages.titleMain)}</Typography.Title>

      <form onSubmit={handleSubmit(onSubmit)} className="form-register__form">
        <div className="form-register__input">
          <Controller
            name="firstName"
            control={control}
            rules={{
              required: fm(messages.validationRequiredField),
              minLength: { value: 1, message: fm(messages.validationFirstNameMinLength) },
              maxLength: { value: 30, message: fm(messages.validationFirstNameMaxLength) },
            }}
            render={({ field }) => (
              <Input
                placeholder={fm(messages.placeholderFirstName)}
                status={errors.firstName && 'error'}
                {...field}
              />
            )}
          />
          {errors.firstName && (
            <Typography.Text className="form-register__inputError">
              {errors.firstName.message}
            </Typography.Text>
          )}
        </div>

        <div className="form-register__input">
          <Controller
            name="secondName"
            control={control}
            rules={{
              required: fm(messages.validationRequiredField),
              minLength: { value: 1, message: fm(messages.validationSecondNameMinLength) },
              maxLength: { value: 30, message: fm(messages.validationSecondNameMaxLength) },
            }}
            render={({ field }) => (
              <Input
                placeholder={fm(messages.placeholderSecondName)}
                status={errors.secondName && 'error'}
                {...field}
              />
            )}
          />
          {errors.secondName && (
            <Typography.Text className="form-register__inputError">
              {errors.secondName.message}
            </Typography.Text>
          )}
        </div>

        <div className="form-register__input">
          <Controller
            name="login"
            control={control}
            rules={{
              required: fm(messages.validationRequiredField),
              minLength: { value: 3, message: fm(messages.validationLoginMinLength) },
              maxLength: { value: 20, message: fm(messages.validationLoginMaxLength) },
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
            <Typography.Text className="form-register__inputError">
              {errors.login.message}
            </Typography.Text>
          )}
        </div>

        <div className="form-register__input">
          <Controller
            name="email"
            control={control}
            rules={{
              required: fm(messages.validationRequiredField),
              minLength: { value: 5, message: fm(messages.validationEmailMinLength) },
              maxLength: { value: 30, message: fm(messages.validationEmailMaxLength) },
            }}
            render={({ field }) => (
              <Input
                placeholder={fm(messages.placeholderEmail)}
                status={errors.email && 'error'}
                {...field}
              />
            )}
          />
          {errors.email && (
            <Typography.Text className="form-register__inputError">
              {errors.email.message}
            </Typography.Text>
          )}
        </div>

        <div className="form-register__input">
          <Controller
            name="password"
            control={control}
            rules={{
              required: fm(messages.validationRequiredField),
              minLength: { value: 7, message: fm(messages.validationPasswordMinLength) },
              maxLength: { value: 50, message: fm(messages.validationPasswordMaxLength) },
            }}
            render={({ field }) => (
              <Input.Password
                placeholder={fm(messages.placeholderPassword)}
                status={errors.password && 'error'}
                {...field}
              />
            )}
          />
          {errors.password && (
            <Typography.Text className="form-register__inputError">
              {errors.password.message}
            </Typography.Text>
          )}
        </div>

        <div className="form-register__input">
          <Controller
            name="phone"
            control={control}
            rules={{
              required: fm(messages.validationRequiredField),
              minLength: { value: 10, message: fm(messages.validationPhoneMinLength) },
              maxLength: { value: 15, message: fm(messages.validationPhoneMaxLength) },
            }}
            render={({ field }) => (
              <Input
                placeholder={fm(messages.placeholderPhone)}
                status={errors.phone && 'error'}
                {...field}
              />
            )}
          />
          {errors.phone && (
            <Typography.Text className="form-register__inputError">
              {errors.phone.message}
            </Typography.Text>
          )}
        </div>

        <Button htmlType="submit" type="primary" className="form-register__submitButton">
          {fm(messages.buttonRegister)}
        </Button>
      </form>

      <div>
        <Typography.Text>{fm(messages.textAlreadyHaveAccount)} </Typography.Text>
        <Link to={ROUTES.LOGIN_PAGE.path} className="form-register__link">
          <Typography.Text className="form-register__linkText">
            {fm(messages.buttonLogin)}
          </Typography.Text>
        </Link>
      </div>
    </div>
  );
};
