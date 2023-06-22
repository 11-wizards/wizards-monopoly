import type { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import { ProfileForm } from 'features/Profile';

import './ProfilePage.scss';

export const ProfilePage: FC = () => {
  const navigate = useNavigate();

  return (
    <div className="wrapper_profilePage">
      <ProfileForm />

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
