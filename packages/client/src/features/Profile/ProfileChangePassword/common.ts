import { defineMessages } from 'react-intl';

export const messages = defineMessages({
  buttonCancel: { id: 'universal.cancel', defaultMessage: 'Cancel' },
  buttonSave: { id: 'universal.save', defaultMessage: 'Save' },
  titleMain: { id: 'profile.change-password.title', defaultMessage: 'Change password' },
  placeholderOldPassword: {
    id: 'profile.change-password.placeholder.old-password',
    defaultMessage: 'Old password',
  },
  placeholderNewPassword: {
    id: 'profile.change-password.placeholder.new-password',
    defaultMessage: 'New password',
  },
  validationRequiredField: {
    id: 'validation.required-field',
    defaultMessage: 'This field is required',
  },
});
