import type { FC } from 'react';
import { type IntlFormatters, useIntl } from 'react-intl';
import { Upload, message } from 'antd';
import type { RcFile } from 'antd/es/upload';
import { PlusOutlined } from '@ant-design/icons';
import type { UploadRequestOption } from 'rc-upload/lib/interface';
import { changeProfileAvatar } from 'app/slices/userSlice';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { messages } from './common';

import './ProfileChangeAvatar.scss';

type BeforeUploadOptions = {
  fm: IntlFormatters['formatMessage'];
};

async function beforeUpload(file: RcFile, { fm }: BeforeUploadOptions) {
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

type ProfileChangeAvatarProps = {
  onSuccess: () => void;
};

export const ProfileChangeAvatar: FC<ProfileChangeAvatarProps> = ({ onSuccess }) => {
  const { formatMessage: fm } = useIntl();
  const dispatch = useAppDispatch();

  const uploadAvatar = async (data: UploadRequestOption) => {
    await dispatch(changeProfileAvatar(data));

    onSuccess();
  };

  return (
    <Upload
      name="avatar"
      listType="picture-circle"
      showUploadList={false}
      beforeUpload={(file: RcFile) => beforeUpload(file, { fm })}
      customRequest={uploadAvatar}
      className="upload-container"
    >
      <div>
        <PlusOutlined />
        <div className="upload-container__textUpload">{fm(messages.textUpload)}</div>
      </div>
    </Upload>
  );
};
