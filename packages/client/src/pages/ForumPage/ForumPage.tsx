import { selectIsAuth } from 'app/slices/userSlice';
import { useAppSelector } from 'hooks';
import type { FC } from 'react';
import { Forum } from 'features/Forum';
import { useNavigate } from 'react-router-dom';

import './ForumPage.scss';

export const ForumPage: FC = () => {
  const userIsAuth = useAppSelector(selectIsAuth);
  const navigate = useNavigate();

  if (userIsAuth) {
    return navigate('/login');
  }

  return (
    <div className="page forum-page">
      <Forum />
    </div>
  );
};
