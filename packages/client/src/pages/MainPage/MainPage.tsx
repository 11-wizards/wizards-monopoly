import { fetchCurrentUser } from 'app/slices/userSlice';
import { useOAuthSignIn } from 'hooks/useOAuthSignIn';
import type { FC } from 'react';
import { Landing } from 'features/Landing';

import './MainPage.scss';

export const MainPage: FC = () => {
  useOAuthSignIn();
  fetchCurrentUser();

  return (
    <div className="wrapper_mainPage">
      <Landing />
    </div>
  );
};
