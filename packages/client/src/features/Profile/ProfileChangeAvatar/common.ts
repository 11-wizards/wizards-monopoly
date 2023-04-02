import { defineMessages } from 'react-intl';

export const messages = defineMessages({
  textUpload: { id: 'universal.upload', defaultMessage: 'Upload' },
  validationAvatarInvalidExtension: {
    id: 'validation.avatar.invalid-extension',
    defaultMessage: 'You can only upload JPG/PNG file',
  },
  validationAvatarSizeLimit: {
    id: 'validation.avatar.size-limit',
    defaultMessage: 'Image must smaller than 2MB',
  },
});
