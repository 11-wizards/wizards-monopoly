import { type IntlFormatters, defineMessages } from 'react-intl';
import { message } from 'antd';
import type { RcFile } from 'antd/lib/upload';

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

type BeforeUploadOptions = {
  fm: IntlFormatters['formatMessage'];
};

export async function beforeUpload(file: RcFile, { fm }: BeforeUploadOptions) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';

  if (!isJpgOrPng) {
    await message.open({
      type: 'error',
      content: fm(messages.validationAvatarInvalidExtension),
    });
  }

  const isLt2M = file.size / 1024 / 1024 < 2;

  if (!isLt2M) {
    await message.open({
      type: 'error',
      content: fm(messages.validationAvatarSizeLimit),
    });
  }

  return isJpgOrPng && isLt2M;
}
