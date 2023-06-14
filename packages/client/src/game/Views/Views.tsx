import { resetDices } from 'game/helpers/helpers';
import { useCardsDataLoad, useFullScreenApi, useGameViewsCalc } from 'hooks';
import type { FC } from 'react';
import { useEffect, useRef, useState } from 'react';
import type { Card, NewTargetPlayer, Players, PlayerTarget } from 'game/types/game';
import { StepsMove } from 'game/types/game';
import { Dices } from './Dices/Dices';
import { Map } from './Map';
import { PlayerInterface } from './PlayerInterface';

const { START, DIECES, MOVE, ACTION, RENDER } = StepsMove;

type TypeUseGameViewsCalc = Nullable<{
  NUMBER_CARDS: number;
  SIZE_CORNER_CARDS: number;
  cards: Array<Card>;
  interfaceSize: number;
  mapSize: number;
  playerSize: number;
  speed: number;
}>;

type ViewsProps = {
  clickStartPlayerTurn: () => void;
  mapData: unknown;
  moveStep: StepsMove;
  newTargetPlayer: Nullable<NewTargetPlayer>;
  nextMoveSteps: (nextStep?: StepsMove | undefined) => void;
  players: Players;
  renderEnd: () => React.Dispatch<React.SetStateAction<boolean>> | void;
};

export const Views: FC<ViewsProps> = ({
  players,
  newTargetPlayer,
  renderEnd,
  clickStartPlayerTurn,
  moveStep,
  nextMoveSteps,
}) => {
  const [playerTarget, setTargetPlayer] = useState<Nullable<PlayerTarget>>(null);

  const cardsData = useCardsDataLoad();

  const mapParams: TypeUseGameViewsCalc = useGameViewsCalc();

  if (!mapParams || !cardsData) return <>ЗАГРУЗКА КАРТЫ!</>;
  const { mapSize, playerSize, cards, interfaceSize, speed, SIZE_CORNER_CARDS, NUMBER_CARDS } =
    mapParams;

  return (
    <Map
      mapData={{
        mapSize,
        playerSize,
        cards,
        cardsData,
        interfaceSize,
        speed,
        SIZE_CORNER_CARDS,
        NUMBER_CARDS,
      }}
      players={players}
      playerTarget={newTargetPlayer}
      setAnimationEnd={renderEnd}
    />
  );
};
