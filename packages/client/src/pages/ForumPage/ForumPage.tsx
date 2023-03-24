import { FC } from 'react';
import { Forum } from 'features/Forum';

import './ForumPage.scss';

export const ForumPage: FC = () => {
  return (
    <div className="wrapper_forumPage">
      <Forum />
    </div>
  );
};
