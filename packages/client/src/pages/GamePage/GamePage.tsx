import type { FC } from 'react';
import { Game } from 'game/Game';

import './GamePage.scss';



export const GamePage: FC = () => (
  <div className="wrapper_game">
    <Game />
  </div>
);
