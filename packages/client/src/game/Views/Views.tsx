import { resetDices } from 'game/helpers/helpers';
import { useEffect, useState } from 'react';
import type { MapData, NewTargetPlayer, Players, PlayerTarget } from 'types/game';
import { Dice } from './DIce/Dice';
import { Map } from './Map';

type Props = {
  mapData: MapData;
  players: Players;
  newTargetPlayer: NewTargetPlayer;
  renderEnd: () => React.Dispatch<React.SetStateAction<boolean>>;
};

export const Views = ({
  mapData,
  players = [],
  newTargetPlayer = null,
  renderEnd,
}: Props): JSX.Element => {
  const [animateOneDice, setAnimateOneDice] = useState<boolean>(false);
  const [animateTwoDice, setAnimateTwoDice] = useState<boolean>(false);

  const [playerTarget, setTargetPlayer] = useState<PlayerTarget>(null);

  const [diceOne, setDiceOne] = useState({
    offset: 150,
    number: 0,
    resetKey: 0,
    speed: 2,
  });
  const [diceTwo, setDiceTwo] = useState({
    offset: -130,
    number: 0,
    resetKey: 0,
    speed: 3,
  });

  const stopAnimateOneDice = (): void => setAnimateOneDice(false);
  const stopAnimateTwoDice = (): void => setAnimateTwoDice(false);

  const startAnimateDices = (dicesNumber: Array<number> | []): void => {
    if (!dicesNumber.length) return;
    setAnimateOneDice(true);
    setAnimateTwoDice(true);
    setDiceOne((prev) => ({ ...prev, number: dicesNumber[0], resetKey: resetDices() }));
    setDiceTwo((prev) => ({ ...prev, number: dicesNumber[1], resetKey: resetDices() }));
  };

  useEffect(() => {
    const dicesNumber = newTargetPlayer?.dicesNumber;
    if (!Array.isArray(dicesNumber)) return;
    startAnimateDices(dicesNumber);
  }, [newTargetPlayer]);

  useEffect(() => {
    if (animateOneDice || animateTwoDice) return;
    if (!newTargetPlayer) return;
    const { id, target } = newTargetPlayer;
    setTargetPlayer({ id, target });
  }, [animateOneDice, animateTwoDice]);

  return (
    <div className="game-views">
      <Dice {...diceOne} stopAnimate={stopAnimateOneDice} />
      <Dice {...diceTwo} stopAnimate={stopAnimateTwoDice} />
      <Map
        mapData={mapData}
        players={players}
        playerTarget={playerTarget}
        setAnimationEnd={renderEnd}
      />
    </div>
  );
};
