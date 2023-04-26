import { Button } from 'antd';
import type { FC } from 'react';

import './PlayerInterface.scss';

type PlayerInterfaceProps = {
  clickStartPlayerTurn: () => void;
  fullScreenToggle: JSX.Element;
  size: number;
};

export const PlayerInterface: FC<PlayerInterfaceProps> = ({
  fullScreenToggle,
  size,
  clickStartPlayerTurn,
}) => (
  <div className="player-interface" style={{ width: size, height: size }}>
    <Button onClick={clickStartPlayerTurn}>Новый ход</Button>
    {fullScreenToggle}
  </div>
);
