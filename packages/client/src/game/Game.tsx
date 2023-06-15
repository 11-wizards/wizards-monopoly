import { useEffect, useRef, useState } from 'react';
import type { NewTargetPlayer, StepsMove } from 'game/types/game';
import { DIECES, MOVE, INITIAL, RENDER, ACTION } from 'game/types/game';
import { useAppDispatch, useAppSelector, useCardsDataLoad, useGameViewsCalc } from 'hooks';
import {
  changeCardData,
  changePositionPlayer,
  defineCards,
  definePlayers,
  leavePlayer,
  selectCardsData,
  selectPlayers,
} from 'app/slices/gameSlice';
import type { TypeUseGameViewsCalc } from 'hooks/useGameViewsCalc';
import { MAP_DATA } from './common';
import { rollDices } from './helpers/helpers';
import { PlayerInterface } from './Views/PlayerInterface';
import { Dices } from './Views/Dices/Dices';
import { Map } from './Views/Map';
import { RANDOM, TAX } from 'game/types/cards';
import { WithBankProps, withBank } from './Bank/withBank';

const GameRoot = ({ randomCardAction, taxCardAction, checkSolvency }: WithBankProps) => {
  const dispatch = useAppDispatch();

  const gameViewsBlock = useRef<HTMLDivElement>(null!);

  const players = useAppSelector(selectPlayers);
  const cardsData = useAppSelector(selectCardsData);

  const mapParams: TypeUseGameViewsCalc = useGameViewsCalc();

  const [cardsDataLoads, cardsImages] = useCardsDataLoad();

  const [currentPlayerStep, setCurrentPlayerStep] = useState<number>(0);
  const [moveStep, setMoveStep] = useState<StepsMove>(RENDER);
  const [newTargetPlayer, setNewTargetPlayer] = useState<Nullable<NewTargetPlayer>>(null);
  const [dicesNumbers, setDicesNumbers] = useState<Array<number>>([]);

  const nextMoveSteps = (nextStep?: StepsMove | undefined) => {
    if (nextStep !== undefined) return setMoveStep(nextStep);
    setMoveStep((prev) => {
      if (prev + 1 > 4) return INITIAL;

      return prev + 1;
    });
  };

  const changePlayer = (player?: number): boolean => {
    console.log(players);

    const winner = players.filter(({ leave }) => !leave);
    if (winner.length < 2) {
      alert('Победитель: ' + winner[0].name);
      return false;
    }
    const currentPlayer = player ? player : currentPlayerStep;
    const nextPlayer = (currentPlayer + 1) % players.length;

    if (players[nextPlayer].leave) {
      changePlayer(nextPlayer);
    } else {
      setCurrentPlayerStep(nextPlayer);
    }
    return true;

    // let results = players.filter(({ leave }) => !leave).length;
    // console.log(results);
    // setCurrentPlayerStep((prevId) => (prevId + 1) % players.length);
  };

  const calcNewTarget = (id: number, steps: number) => {
    const oldTarget = players[id].currentCardId ?? 0;
    const target = steps + oldTarget;
    if (target > MAP_DATA.NUMBER_CARDS - 1) {
      console.log(`круг пройден:${target}`);

      return target - MAP_DATA.NUMBER_CARDS;
    }

    return target;
  };

  const clickStartPlayerTurn = () => {
    if (moveStep !== INITIAL) return;
    const dicesNumber = rollDices();
    nextMoveSteps(DIECES);
    // setDicesNumbers(dicesNumber);
    setDicesNumbers([3, 1]);
  };

  useEffect(() => {
    if (!cardsDataLoads) return;
    dispatch(defineCards(cardsDataLoads));
  }, [cardsDataLoads]);

  useEffect(() => {
    if (moveStep !== INITIAL) return;

    if (newTargetPlayer) {
      const { id, target: currentCardId } = newTargetPlayer;
      // console.log(
      //   id,
      //   checkSolvency(id)
      // );

      dispatch(changePositionPlayer({ id, currentCardId }));
      changePlayer();
      // setCurrentPlayerStep((prevId) => (prevId + 1) % players.length);
    }
  }, [moveStep]);

  useEffect(() => {
    if (moveStep !== MOVE) return;
    const steps = dicesNumbers[0] + dicesNumbers[1];
    const id = currentPlayerStep;

    console.log(`Выпало:  ${dicesNumbers.join(', ')} у игрока ${id}`);

    const target = calcNewTarget(id, steps);
    setNewTargetPlayer({ id, target });
  }, [moveStep]);

  useEffect(() => {
    if (moveStep !== ACTION) return;
    console.log('ACTION');
    if (!newTargetPlayer || !cardsData) return;
    const { target } = newTargetPlayer;
    const card = cardsData[target];
    // dispatch(changeCardData({ card: target, title: 'Куплено!' }));
    switch (card.type) {
      case RANDOM:
        {
          randomCardAction(currentPlayerStep, card, nextMoveSteps);
        }
        break;
      case TAX:
        {
          taxCardAction(currentPlayerStep, card, nextMoveSteps);
        }
        break;
        // case RANDOM: randomCardAction(card, nextMoveSteps);
        break;
      default:
        nextMoveSteps(RENDER);
        break;
    }

    // nextMoveSteps(RENDER);

    // const steps = dicesNumbers[0] + dicesNumbers[1];
    // const id = currentPlayerStep;

    // console.log(`Выпало:  ${dicesNumbers.join(', ')} у игрока ${id}`);

    // const target = calcNewTarget(id, steps);
    // setNewTargetPlayer({ id, target });
  }, [moveStep]);

  useEffect(() => {
    if (moveStep !== RENDER) return;
    console.log('RENDER');
    if (!newTargetPlayer || !cardsData) return;
    const { target } = newTargetPlayer;
    const card = cardsData[target];

    // nextMoveSteps(RENDER);
    // dispatch(changeCardData({ card: target, title: 'Куплено!' }));
    // setCardsData(prev => {
    //   const renameCard = { ...prev[target], title: 'КУПЛЕНО!' };
    //   return { ...prev, [target]: renameCard };
    // });
    // const steps = dicesNumbers[0] + dicesNumbers[1];
    // const id = currentPlayerStep;

    // console.log(`Выпало:  ${dicesNumbers.join(', ')} у игрока ${id}`);

    // const target = calcNewTarget(id, steps);
    // setNewTargetPlayer({ id, target });
  }, [moveStep]);

  if (!mapParams || !cardsData || !cardsImages) return <>ЗАГРУЗКА КАРТЫ!</>;
  const { mapSize, playerSize, cards, interfaceSize, speed, SIZE_CORNER_CARDS, NUMBER_CARDS } =
    mapParams;

  return (
    <div className="game-views" ref={gameViewsBlock} style={{ height: mapSize, width: mapSize }}>
      <Dices dicesNumbers={dicesNumbers} nextStep={() => nextMoveSteps(MOVE)} moveStep={moveStep} />

      <Map
        currentStep={moveStep}
        mapData={{
          mapSize,
          playerSize,
          cards,
          cardsData,
          cardsImages,
          interfaceSize,
          speed,
          SIZE_CORNER_CARDS,
          NUMBER_CARDS,
        }}
        players={players}
        playerTarget={newTargetPlayer}
        setAnimationEnd={() =>
          nextMoveSteps(moveStep === MOVE ? ACTION : moveStep === RENDER ? INITIAL : moveStep)
        }
      />

      <PlayerInterface
        currentStep={moveStep}
        blockRef={gameViewsBlock}
        players={players}
        size={interfaceSize}
        clickStartPlayerTurn={clickStartPlayerTurn}
      />
    </div>
  );
};

// const Component = ({ payRent, claimCircleBonus }: WithBankProps) => {
//   // ...
// }

export const Game = withBank(GameRoot);
