import { Button } from 'antd';
import type { FC } from 'react';
import type { Player, StepsMove } from 'game/types/game';
import { useFullScreenApi } from 'hooks/useFullScreenApi';
import type { CardData } from 'game/types/cards';

import './PlayerInterface.scss';

type PlayerInterfaceProps = {
  blockRef: React.MutableRefObject<HTMLDivElement>;
  cards: Array<CardData>;
  clickStartPlayerTurn: () => void;
  currentStep: StepsMove;
  players: Array<Player>;
  size: number;
};

export const PlayerInterface: FC<PlayerInterfaceProps> = ({
  currentStep,
  blockRef,
  cards,
  size,
  clickStartPlayerTurn,
  players,
}) => {
  console.log(currentStep);

  const fullScreenToggle = useFullScreenApi(blockRef);

  return (
    <div className="player-interface" style={{ width: size, height: size }}>
      <div className="controls">
        <Button onClick={clickStartPlayerTurn}>Новый ход игрока</Button>
        {fullScreenToggle}
      </div>
      <div className={`players-state players-state_${players.length}`}>
        {players &&
          players.map(({ id, leave, balance, name, color }) => {
            const playerProperty = cards.filter(({ property }) => property?.ownerId === id);

            return (
              <div
                key={`player-${id}`}
                className={`player player-${id} ${leave ? 'player_leave' : ''}`}
                style={{ borderColor: color }}
              >
                {leave ? <div className="player__leave-flag">БАНКРОТ</div> : ''}
                <div className="player__name-wrap" style={{ backgroundColor: color }}>
                  <span className="player__name-label"> Игрок:</span>
                  <span className="player__name"> {name}</span>
                </div>
                <div className="player__balance-wrap">
                  <span className="player__balance-label"> Счёт:</span>
                  <span className="player__balance"> {balance}$</span>
                </div>
                {playerProperty.length ? (
                  <div className="player__property-wrap">
                    <div className="player__property-label"> Куплено:</div>
                    <div className="player__property">
                      {playerProperty.map(({ property, title }) => (
                        <div key={`${title}`}>
                          {title} {property?.level ? `, апгрейд - ${property.level}` : ''}{' '}
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  ''
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
};
