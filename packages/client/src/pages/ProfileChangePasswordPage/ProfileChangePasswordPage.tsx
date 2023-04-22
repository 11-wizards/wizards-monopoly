import type { FC } from 'react';
import { ProfileChangePassword } from 'features/Profile';

import './ProfileChangePasswordPage.scss';

export const ProfileChangePasswordPage: FC = () => (
  <div className="wrapper_profileChangePasswordPage">
    <ProfileChangePassword />
  </div>
);
