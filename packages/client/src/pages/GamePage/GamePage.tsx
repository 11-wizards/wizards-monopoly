import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { Game } from 'features/Game';
import { Button } from 'antd';
import type { PlayerTarget } from 'models/game.model';
import { useAppSelector } from '../../hooks/redux';
import { selectPlayers } from '../../app/slices/gameSlice';

import './GamePage.scss';

export const GamePage: FC = () => {
  const players = useAppSelector(selectPlayers);

  const [playerMovingTarget, setPlayerMovingTarget] = useState<Nullable<PlayerTarget>>(null);

  useEffect(() => {
    if (playerMovingTarget === null) {
      // eslint-disable-next-line no-console
      console.log('анимация закончена');
    }
  }, [playerMovingTarget]);

  const handlePlayerMoveTest = (id: string) => {
    // eslint-disable-next-line no-alert
    const target = Number(prompt('Номер клетки для передвижения от 0 до 39') ?? 0);
    if (target > 39 || target < 0) return;
    setPlayerMovingTarget({ id, target });
  };

  const renderButtons = () =>
    players.map((player) => (
      <Button key={player.getId()} onClick={() => handlePlayerMoveTest(player.getId())}>
        GO-{player.getName().toUpperCase()}
      </Button>
    ));

  return (
    <div className="wrapper_game">
      {renderButtons()}
      <Game
        playerMovingTarget={playerMovingTarget}
        handlePlayerMovingTarget={setPlayerMovingTarget}
      />
    </div>
  );
};
