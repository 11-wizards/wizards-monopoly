import { FC } from 'react';
import { Login } from 'features/Login';

import './LoginPage.scss';

export const LoginPage: FC = () => {
  return (
    <div className="wrapper_loginPage">
      <Login />
    </div>
  );
};
