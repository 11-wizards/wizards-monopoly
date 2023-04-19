import { MAP_DATA } from 'game/common';

import './PlayerInterface.scss';

const { MAP_SIZE, SIZE_CORNER_CARDS } = MAP_DATA;

export const PlayerInterface = ({ fullScreenToggle }): JSX.Element => {
  const size = MAP_SIZE - (MAP_SIZE / 100) * SIZE_CORNER_CARDS * 2 - 20;

  return (
    <div className="player-interface" style={{ width: size, height: size }}>
      {fullScreenToggle}
    </div>
  );
};
