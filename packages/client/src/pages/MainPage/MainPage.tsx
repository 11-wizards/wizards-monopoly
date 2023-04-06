import type { FC } from 'react';
import { Landing } from 'features/Landing';

import './MainPage.scss';

export const MainPage: FC = () => (
  <div className="wrapper_mainPage">
    <Landing />
  </div>
);
