import { useEffect, useRef, useState } from 'react';
import type { StepsMove } from 'game/types/game';
import { DIECES, MOVE, INITIAL, RENDER, ACTION } from 'game/types/game';
import { useAppDispatch, useAppSelector, useCardsDataLoad, useGameViewsCalc } from 'hooks';
import {
  // changeCardData,
  changeCurrentPlayer,
  changePositionPlayer,
  // defineCards,
  // definePlayers,
  deprivePropertyPlayer,
  // leavePlayer,
  selectCardsData,
  selectCurrentPlayer,
  selectPlayers,
  selectRoot,
} from 'app/slices/gameSlice';
import type { TypeUseGameViewsCalc } from 'hooks/useGameViewsCalc';
import {
  // RANDOM,
  STREET,
  // TAX
} from 'game/types/cards';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from 'core/Router';
import { rollDices } from './helpers/helpers';
import { PlayerInterface } from './Views/PlayerInterface';
import { Dices } from './Views/Dices/Dices';
import { Map } from './Views/Map';
import type { TypeMapCardsData, TypeMapData } from './types/map';
import { NUMBER_CARDS } from './constants';
// import { explample_players } from './common';

const GameRoot = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const gameViewsBlock = useRef<HTMLDivElement>(null!);

  const players = useAppSelector(selectPlayers);
  const root = useAppSelector(selectRoot);

  console.log(root);

  const cardsData = useAppSelector(selectCardsData);

  const [_cardsDataLoads, cardsImages] = useCardsDataLoad();

  const mapParams: TypeUseGameViewsCalc = useGameViewsCalc();

  const currentPlayerStep = useAppSelector(selectCurrentPlayer);
  // const [currentPlayerStep, setCurrentPlayerStep] = useState<number | null>(null);

  const [moveStep, setMoveStep] = useState<StepsMove>(RENDER);

  const [newTargetPlayer, setNewTargetPlayer] =
    useState<Nullable<{ id: number; target: number }>>(null);

  const [dicesNumbers, setDicesNumbers] = useState<Array<number>>([]);

  const nextMoveSteps = (nextStep?: StepsMove | undefined) => {
    if (nextStep !== undefined) return setMoveStep(nextStep);
    setMoveStep((prev) => {
      if (prev + 1 > 4) return INITIAL;

      return prev + 1;
    });
  };

  const changePlayer = (player?: number): boolean => {
    const winner = players.filter(({ leave }) => !leave);
    if (winner.length < 2) {
      alert(`Победитель: ${winner[0].name}`);

      return false;
    }
    const currentPlayer = player || currentPlayerStep;

    const nextPlayer = currentPlayer === null ? 0 : (currentPlayer + 1) % players.length;

    if (players[nextPlayer].leave) {
      changePlayer(nextPlayer);
    } else {
      dispatch(changeCurrentPlayer(nextPlayer));
      // setCurrentPlayerStep(nextPlayer);
    }

    return true;
  };

  const calcNewTarget = (id: number, steps: number) => {
    const oldTarget = players[id].currentCardId ?? 0;
    const target = steps + oldTarget;
    if (target > NUMBER_CARDS - 1) {
      console.log(`круг пройден:${target}`);

      return target - NUMBER_CARDS;
    }

    return target;
  };

  const clickStartPlayerTurn = () => {
    if (moveStep !== INITIAL) return;
    const dicesNumber = rollDices();
    nextMoveSteps(DIECES);
    setDicesNumbers(dicesNumber);
    // setDicesNumbers([3, 1]);
  };

  useEffect(() => {
    if (players.length) return;
    navigate(ROUTES.START_GAME_PAGE.path);
    // dispatch(definePlayers(explample_players));
  }, []);

  useEffect(() => {
    if (moveStep !== INITIAL) return;
    console.log('INITIAL');
    if (newTargetPlayer) {
      changePlayer();
      const { id, target: currentCardId } = newTargetPlayer;
      // console.log(
      //   id,
      //   checkSolvency(id)
      // );

      dispatch(changePositionPlayer({ id, currentCardId }));
      // setCurrentPlayerStep((prevId) => (prevId + 1) % players.length);
    } else if (currentPlayerStep === null) {
      dispatch(changeCurrentPlayer(0));
    }
  }, [moveStep]);

  useEffect(() => {
    if (moveStep !== MOVE) return;
    const steps = dicesNumbers[0] + dicesNumbers[1];
    const id = currentPlayerStep;
    if (id === null) return;
    console.log(`Выпало:  ${dicesNumbers.join(', ')} у игрока ${id}`);

    const target = calcNewTarget(id, steps);
    dispatch(changePositionPlayer({ id, currentCardId: target }));
    setNewTargetPlayer({ id, target });
  }, [moveStep]);

  useEffect(() => {
    if (moveStep !== ACTION) return;
    console.log('ACTION');
    if (!newTargetPlayer || !cardsData) return;
    // const { target } = newTargetPlayer;
    // const card = cardsData[target];
    // dispatch(changeCardData({ card: target, title: 'Куплено!' }));

    // switch (card.type) {
    //   case RANDOM:
    //     {
    //       // randomCardAction(currentPlayerStep, card, nextMoveSteps);
    //     }
    //     break;
    //   case TAX:
    //     {
    //       // taxCardAction(currentPlayerStep, card, nextMoveSteps);
    //     }
    //     break;
    //     // case RANDOM: randomCardAction(card, nextMoveSteps);
    //     break;
    //   default:
    //     break;
    // }
    nextMoveSteps(INITIAL);

    // nextMoveSteps(RENDER);

    // const steps = dicesNumbers[0] + dicesNumbers[1];
    // const id = currentPlayerStep;

    // console.log(`Выпало:  ${dicesNumbers.join(', ')} у игрока ${id}`);

    // const target = calcNewTarget(id, steps);
    // setNewTargetPlayer({ id, target });
  }, [moveStep]);

  // useEffect(() => {
  //   // if (moveStep !== RENDER) return;
  //   // console.log('RENDER');
  //   // if (!newTargetPlayer || !cardsData) return;
  //   // const { target } = newTargetPlayer;
  //   // const card = cardsData[target];

  //   // nextMoveSteps(RENDER);
  //   // dispatch(changeCardData({ card: target, title: 'Куплено!' }));
  //   // setCardsData(prev => {
  //   //   const renameCard = { ...prev[target], title: 'КУПЛЕНО!' };
  //   //   return { ...prev, [target]: renameCard };
  //   // });
  //   // const steps = dicesNumbers[0] + dicesNumbers[1];
  //   // const id = currentPlayerStep;

  //   // console.log(`Выпало:  ${dicesNumbers.join(', ')} у игрока ${id}`);

  //   // const target = calcNewTarget(id, steps);
  //   // setNewTargetPlayer({ id, target });
  // }, [moveStep]);

  if (!mapParams || !cardsData || !cardsImages) return <>ЗАГРУЗКА КАРТЫ!</>;
  const { mapSize, playerSize, cards, interfaceSize } = mapParams;

  const mapCardsData: Array<TypeMapCardsData> = cards.map((card, key) => ({
    ...card,
    img: cardsImages[key],
    price: cardsData[key].price ?? null,
    colorLabel: cardsData[key].type === STREET ? cardsData[key].family : null,
    title: cardsData[key].title ?? null,
    level: cardsData[key].property?.level ?? null,
    type: cardsData[key].type,
    colorBg: cardsData[key].property?.color ?? null,
  }));
  const mapData: TypeMapData = {
    mapSize,
    playerSize,
    cards: mapCardsData,
    players,
  };

  const CardsDataInterface = Object.values(cardsData).filter(({ property }) => property);

  const test = () => {
    // dispatch(addMoneyForPlayer({ playerId: 1, amount: 9909999 }));
    // dispatch(deductMoneyFromPlayer({ playerId: 3, amount: 9909999 }));
    dispatch(deprivePropertyPlayer(2));
    nextMoveSteps(RENDER);
    //   dispatch(transferPropertyCard({ cardId: 19, playerId: 0 }));
    //   dispatch(transferPropertyCard({ cardId: 2, playerId: 0 }));
    //   dispatch(transferPropertyCard({ cardId: 4, playerId: 0 }));
    //   dispatch(transferPropertyCard({ cardId: 5, playerId: 0 }));
    //   dispatch(transferPropertyCard({ cardId: 10, playerId: 0 }));
    //   dispatch(transferPropertyCard({ cardId: 11, playerId: 0 }));
    //   // dispatch(withdrawPropertyCard(11));
    //   dispatch(upgradeLevelCard(19));
  };

  return (
    <div className="game-views" ref={gameViewsBlock} style={{ height: mapSize, width: mapSize }}>
      <Dices
        dicesNumbers={dicesNumbers}
        stopRender={() => nextMoveSteps(MOVE)}
        render={moveStep === DIECES}
      />

      <Map
        mapData={mapData}
        playerTarget={newTargetPlayer}
        render={moveStep === RENDER || moveStep === MOVE}
        stopRender={() =>
          // eslint-disable-next-line
          nextMoveSteps(moveStep === MOVE ? ACTION : moveStep === RENDER ? INITIAL : moveStep)
        }
      />
      <Button onClick={test}>Click</Button>
      <PlayerInterface
        currentStep={moveStep}
        blockRef={gameViewsBlock}
        players={players}
        cards={CardsDataInterface}
        size={interfaceSize}
        clickStartPlayerTurn={clickStartPlayerTurn}
      />
    </div>
  );
};

// const Component = ({ payRent, claimCircleBonus }: WithBankProps) => {
//   // ...
// }

export const Game = GameRoot;
