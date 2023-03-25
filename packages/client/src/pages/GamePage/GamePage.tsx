import type { FC } from 'react';
import { Game } from 'features/Game';

import './GamePage.scss';

export const GamePage: FC = () => (
  <div className="wrapper_game">
    <Game />
  </div>
);
