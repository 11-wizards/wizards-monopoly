import type { FC } from 'react';
import { ProfileForm } from 'features/Profile';

import './ProfilePage.scss';

export const ProfilePage: FC = () => (
  <div className="wrapper_profilePage">
    <ProfileForm />
  </div>
);
