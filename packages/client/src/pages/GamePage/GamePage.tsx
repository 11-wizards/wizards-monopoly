import { FC } from 'react';
import { Game } from 'features/Game';

import './GamePage.scss';

export const GamePage: FC = () => {
  return (
    <div className="wrapper_game">
      <Game />
    </div>
  );
};
