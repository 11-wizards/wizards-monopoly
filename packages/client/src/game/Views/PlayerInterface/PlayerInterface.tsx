import { Button } from 'antd';
import type { FC } from 'react';
import type { Player, StepsMove } from 'types/game';
import { useFullScreenApi } from 'hooks/useFullScreenApi';

import './PlayerInterface.scss';

type PlayerInterfaceProps = {
  currentStep: StepsMove;
  blockRef: React.MutableRefObject<HTMLDivElement>;
  clickStartPlayerTurn: () => void;
  players: Array<Player>;
  size: number;
};

export const PlayerInterface: FC<PlayerInterfaceProps> = ({
  currentStep,
  blockRef,
  size,
  clickStartPlayerTurn,
  players,
}) => {
  const fullScreenToggle = useFullScreenApi(blockRef);

  return (
    <div className="player-interface" style={{ width: size, height: size }}>
      <div className="controls">
        <Button onClick={clickStartPlayerTurn}>Новый ход игрока</Button>
        {fullScreenToggle}
      </div>
      <div className={`players-state players-state_${players.length}`}>
        {players &&
          players.map(({ id, currentCardId, balance, name, color }) => (
            <div
              key={`player-${id}`}
              className={`player player-${id}`}
              style={{ borderColor: color }}
            >
              <div className="player__name-wrap" style={{ backgroundColor: color }}>
                <span className="player__name-label"> Игрок:</span>
                <span className="player__name"> {name}</span>
              </div>
              <div className="player__balance-wrap">
                <span className="player__balance-label"> Счёт:</span>
                <span className="player__balance"> {balance} </span>
              </div>

              <div className="player__property-wrap">
                <div className="player__property-label"> Куплено:</div>
                <div className="player__property">
                  <div>Ленинградская ж.д</div>
                  <div>Ленинградская ж.д</div>
                  <div>Ленинградская ж.д</div>
                  <div>Ленинградская ж.д</div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
