import type { FC } from 'react';
import { EndGame } from 'features/EndGame';

import './EndGamePage.scss';

export const EndGamePage: FC = () => (
  <div className="wrapper_endGamePage">
    <EndGame />
  </div>
);
