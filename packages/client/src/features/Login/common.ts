import { defineMessages } from 'react-intl';

export const messages = defineMessages({
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
