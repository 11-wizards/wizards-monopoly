import type { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import { ProfileChangePassword } from 'features/Profile';

import './ProfileChangePasswordPage.scss';

export const ProfileChangePasswordPage: FC = () => {
  const navigate = useNavigate();

  return (
    <div className="wrapper_profileChangePasswordPage">
      <ProfileChangePassword />

      <Button
        shape="circle"
        icon={<LeftOutlined />}
        onClick={() => {
          navigate(-1);
        }}
        className="go-back-button"
      />
    </div>
  );
};
