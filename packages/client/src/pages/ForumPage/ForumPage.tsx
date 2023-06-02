import { selectIsAuth } from 'app/slices/userSlice';
import { useAppSelector } from 'hooks';
import { Forum } from 'features/Forum';
import { useNavigate } from 'react-router-dom';

import './ForumPage.scss';

export const ForumPage = (): JSX.Element | null => {
  const userIsAuth = useAppSelector(selectIsAuth);
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
