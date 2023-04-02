import type { FC } from 'react';
import { Forum } from 'features/Forum';

import './ForumPage.scss';

export const ForumPage: FC = () => (
  <div className="wrapper-forum-page">
    <Forum />
  </div>
);
