import { resetDices } from 'game/helpers/helpers';
import { useFullScreenApi, useGameViewsCalc } from 'hooks';
import { useEffect, useRef, useState } from 'react';
import type { NewTargetPlayer, Players, PlayerTarget } from 'types/game';
import { Dice } from './DIce/Dice';
import { Map } from './Map';
import { PlayerInterface } from './PlayerInterface';

type TypeUseGameViewsCalc = {
  mapSize: number;
  playerSize: number;
  cards: number[][];
  interfaceSize: number;
  speed: number;
  SIZE_CORNER_CARDS: number;
  NUMBER_CARDS: number;
} | null;

type Props = {
  players: Players;
  newTargetPlayer: NewTargetPlayer;
  clickStartPlayerTurn: () => void;
  renderEnd: () => React.Dispatch<React.SetStateAction<boolean>>;
};

export const Views = ({
  players,
  newTargetPlayer,
  renderEnd,
  clickStartPlayerTurn,
}: Props): JSX.Element => {
  const gameViewsBlock = useRef<HTMLDivElement>(null);

  const fullScreenToggle = useFullScreenApi(gameViewsBlock.current);

  const [animateOneDice, setAnimateOneDice] = useState<boolean>(true);
  const [animateTwoDice, setAnimateTwoDice] = useState<boolean>(true);

  const [playerTarget, setTargetPlayer] = useState<PlayerTarget | null>(null);

  const [diceOne, setDiceOne] = useState<{
    offset: number;
    number: number;
    resetKey: number;
    speed: number;
  }>({
    offset: 150,
    number: 0,
    resetKey: 0,
    speed: 2,
  });
  const [diceTwo, setDiceTwo] = useState<{
    offset: number;
    number: number;
    resetKey: number;
    speed: number;
  }>({
    offset: -130,
    number: 0,
    resetKey: 0,
    speed: 3,
  });

  const stopAnimateOneDice = (): void => setAnimateOneDice(false);
  const stopAnimateTwoDice = (): void => setAnimateTwoDice(false);

  const startAnimateDices = (dicesNumber: Array<number>): void => {
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

  const mapParams: TypeUseGameViewsCalc = useGameViewsCalc();

  if (!mapParams) return <>ЗАГРУЗКА КАРТЫ!</>;
  const { mapSize, playerSize, cards, interfaceSize, speed, SIZE_CORNER_CARDS, NUMBER_CARDS } =
    mapParams;

  return (
    <div className="game-views" ref={gameViewsBlock} style={{ height: mapSize, width: mapSize }}>
      <Dice {...diceOne} stopAnimate={stopAnimateOneDice} />
      <Dice {...diceTwo} stopAnimate={stopAnimateTwoDice} />
      <Map
        mapData={{
          mapSize,
          playerSize,
          cards,
          interfaceSize,
          speed,
          SIZE_CORNER_CARDS,
          NUMBER_CARDS,
        }}
        players={players}
        playerTarget={playerTarget}
        setAnimationEnd={renderEnd}
      />
      <PlayerInterface
        fullScreenToggle={fullScreenToggle}
        size={interfaceSize}
        clickStartPlayerTurn={clickStartPlayerTurn}
      />
    </div>
  );
};
