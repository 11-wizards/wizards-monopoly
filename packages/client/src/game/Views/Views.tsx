import { resetDices } from 'game/helpers/helpers';
import { useFullScreenApi, useGameViewsCalc } from 'hooks';
import type { FC } from 'react';
import { useEffect, useRef, useState } from 'react';
import type { NewTargetPlayer, Players, PlayerTarget } from 'types/game';
import { Dice } from './Dice/Dice';
import { Map } from './Map';
import { PlayerInterface } from './PlayerInterface';

type TypeUseGameViewsCalc = Nullable<{
  NUMBER_CARDS: number;
  SIZE_CORNER_CARDS: number;
  cards: number[][];
  interfaceSize: number;
  mapSize: number;
  playerSize: number;
  speed: number;
}>;

type ViewsProps = {
  clickStartPlayerTurn: () => void;
  mapData: unknown;
  newTargetPlayer: Nullable<NewTargetPlayer>;
  players: Players;
  renderEnd: () => React.Dispatch<React.SetStateAction<boolean>> | void;
};

export const Views: FC<ViewsProps> = ({
  players,
  newTargetPlayer,
  renderEnd,
  clickStartPlayerTurn,
}: ViewsProps) => {
  const gameViewsBlock = useRef<HTMLDivElement>(null!);

  const fullScreenToggle = useFullScreenApi(gameViewsBlock);

  const [animateOneDice, setAnimateOneDice] = useState<boolean>(true);
  const [animateTwoDice, setAnimateTwoDice] = useState<boolean>(true);

  const [playerTarget, setTargetPlayer] = useState<Nullable<PlayerTarget>>(null);

  const [diceOne, setDiceOne] = useState<{
    number: number;
    offset: number;
    resetKey: number;
    speed: number;
  }>({
    offset: 150,
    number: 0,
    resetKey: 0,
    speed: 2,
  });
  const [diceTwo, setDiceTwo] = useState<{
    number: number;
    offset: number;
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
