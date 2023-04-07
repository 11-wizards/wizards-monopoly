import type { FC } from 'react';
import { useIntl } from 'react-intl';
import { Upload } from 'antd';
import type { RcFile } from 'antd/es/upload';
import { PlusOutlined } from '@ant-design/icons';
import type { UploadRequestOption } from 'rc-upload/lib/interface';
import { changeProfileAvatar } from 'app/slices/userSlice';
import { useAppDispatch } from 'hooks/redux';
import { beforeUpload, messages } from './common';

import './ProfileChangeAvatar.scss';

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
