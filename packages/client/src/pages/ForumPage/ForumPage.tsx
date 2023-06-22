import type { RootState } from 'app/store';
import { useAppSelector } from 'hooks';
import { Forum } from 'features/Forum';
import { useNavigate } from 'react-router-dom';

import './ForumPage.scss';

export const ForumPage = (): JSX.Element | null => {
  const userIsAuth = useAppSelector((state: RootState) => state.user.isAuth);
  const navigate = useNavigate();

  if (!userIsAuth) {
    navigate('/login');

    return null;
  }

  return (
    <div className="page forum-page">
      <Forum />
    </div>
  );
};
