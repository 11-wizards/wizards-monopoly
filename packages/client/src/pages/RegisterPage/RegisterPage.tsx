import { FC } from 'react';
import { Register } from 'features/Register';

import './RegisterPage.scss';

export const RegisterPage: FC = () => {
  return (
    <div className="wrapper_registerPage">
      <Register />
    </div>
  );
};
