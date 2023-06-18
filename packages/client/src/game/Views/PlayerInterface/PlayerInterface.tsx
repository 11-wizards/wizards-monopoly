import { Button } from 'antd';
import type { FC } from 'react';
import type { StepsMove } from 'game/types/game';
import { Player } from 'game/types/player';
import { useFullScreenApi } from 'hooks/useFullScreenApi';

import './PlayerInterface.scss';
import { useAppDispatch, useAppSelector } from 'hooks';
import { addMoneyForPlayer, changeCardData, deductMoneyFromPlayer, deprivePropertyPlayer, leavePlayer, transferPropertyCard, transferMoneyBetweenPlayers, upgradeLevelCard, withdrawPropertyCard, selectRoot } from 'app/slices/gameSlice';

type PlayerInterfaceProps = {
  currentStep: StepsMove;
  blockRef: React.MutableRefObject<HTMLDivElement>;
  cards: any;
  clickStartPlayerTurn: () => void;
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

  const fullScreenToggle = useFullScreenApi(blockRef);

  // return <div className="player-interface">ЗАГРУЗКА КАРТЫ!</div>;
  return (
    <>
      <div className="player-interface" style={{ width: size, height: size }}>
        <div className="controls">
          <Button onClick={clickStartPlayerTurn}>Новый ход игрока</Button>
          <Button onClick={clickStartPlayerTurn}>Завершить ход</Button>
          {fullScreenToggle}
        </div>
        <div className={`players-state players-state_${players.length}`}>
          {players &&
            players.map(({ id, currentCardId, leave, balance, name, color }) => {
              const playerProperty = cards.filter(({ property: { ownerId } }) => ownerId === id);
              return (
                <div
                  key={`player-${id}`}
                  className={`player player-${id} ${leave ? 'player_leave' : ''}`}
                  style={{ borderColor: color }}
                >
                  {
                    leave ? <div className="player__leave-flag">БАНКРОТ</div> : ''
                  }
                  <div className="player__name-wrap" style={{ backgroundColor: color }}>
                    <span className="player__name-label"> Игрок:</span>
                    <span className="player__name"> {name}</span>
                  </div>
                  <div className="player__balance-wrap">
                    <span className="player__balance-label"> Счёт:</span>
                    <span className="player__balance"> {balance}$</span>
                  </div>
                  {
                    playerProperty.length ?
                      <div className="player__property-wrap">
                        <div className="player__property-label"> Куплено:</div>
                        <div className="player__property">
                          {playerProperty.map(({ property: { level }, title }, key) => <div>{title} {level ? `, апгрейд - ${level}` : ''}  </div>)}
                        </div>
                      </div>
                      : ''
                  }
                </div>
              )
            })}
        </div>
      </div>
    </>
  );
};
