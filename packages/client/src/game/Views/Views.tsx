import { useEffect, useState } from 'react';
import type { MapData, Players } from 'game/Game';
import { Dice } from './DIce/Dice';
import { Map } from './Map';

export type GoPlayer = Record<string, number>;

export type PlayersToMap = Array<{
  x: number;
  y: number;
  direction?: string;
  id: number;
  color: string;
}>;

type Props = {
  mapData: MapData;
  players: Players;
  newTargetPlayer: Record<string, number> | null;
  renderEnd: () => React.Dispatch<React.SetStateAction<boolean>>;
};

export const Views = ({
  mapData,
  players = [],
  newTargetPlayer = null,
  renderEnd,
}: Props): JSX.Element => {
  const playersToMaps: PlayersToMap = [];

  players.forEach((item, key) => {
    playersToMaps[key] = { ...item, x: 0, y: 0 + 20 * key, direction: 'right' };
  });

  const [animateOneDices, setAnimateOneDices] = useState<boolean>(false);
  const [animateTwoDices, setAnimateTwoDices] = useState<boolean>(false);

  const [goPlayer, setGoPlayer] = useState<null | GoPlayer>(null);

  const [diceOne, setDiceOne] = useState({
    offset: 150,
    number: 0,
    diceId: 0,
    resetKey: Math.random() + 1,
    speed: 2,
  });
  const [diceTwo, setDiceTwo] = useState({
    offset: -130,
    number: 0,
    diceId: 1,
    resetKey: Math.random() + 1,
    speed: 3,
  });

  const stopAnimateOneDices = (): void => setAnimateOneDices(false);
  const stopAnimateTwoDices = (): void => setAnimateTwoDices(false);

  const startAnimateDices = (dicesNumber: Array<number> | []): void => {
    if (!dicesNumber.length) return;
    setAnimateOneDices(true);
    setAnimateTwoDices(true);
    setDiceOne((prev) => ({ ...prev, number: dicesNumber[0], resetKey: Math.random() + 1 }));
    setDiceTwo((prev) => ({ ...prev, number: dicesNumber[1], resetKey: Math.random() + 1 }));
  };

  useEffect(() => {
    const dicesNumber = newTargetPlayer?.dicesNumber;
    if (!Array.isArray(dicesNumber)) return;
    startAnimateDices(dicesNumber);
  }, [newTargetPlayer]);

  useEffect(() => {
    if (animateOneDices || animateTwoDices) return;
    if (!newTargetPlayer) return;
    const { id, target } = newTargetPlayer;
    setGoPlayer({ id, target });
  }, [animateOneDices, animateTwoDices]);

  return (
    <div className="game-views">
      <Dice {...diceOne} stopAnimate={stopAnimateOneDices} />
      <Dice {...diceTwo} stopAnimate={stopAnimateTwoDices} />
      <Map mapData={mapData} players={playersToMaps} goPlayer={goPlayer} setGoPlayer={renderEnd} />
    </div>
  );
};
