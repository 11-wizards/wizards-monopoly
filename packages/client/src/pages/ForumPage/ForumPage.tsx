import type { FC } from 'react';
import { Forum } from 'features/Forum';

import './ForumPage.scss';

export const ForumPage: FC = () => (
  <div className="page forum-page">
    <Forum />
  </div>
);
