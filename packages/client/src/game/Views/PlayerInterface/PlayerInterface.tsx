import { Button } from 'antd';

import './PlayerInterface.scss';

type Props = {
  fullScreenToggle: JSX.Element;
  size: number;
  clickStartPlayerTurn: () => void;
};

export const PlayerInterface = ({
  fullScreenToggle,
  size,
  clickStartPlayerTurn,
}: Props): JSX.Element => (
  <div className="player-interface" style={{ width: size, height: size }}>
    <Button onClick={clickStartPlayerTurn}>Новый ход</Button>
    {fullScreenToggle}
  </div>
);
