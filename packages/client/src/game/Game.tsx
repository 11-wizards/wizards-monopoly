import { useEffect, useRef, useState } from 'react';

import type { StepsMove } from 'game/types/game';
import { DIECES, MOVE, INITIAL, RENDER, ACTION } from 'game/types/game';
import { useAppDispatch, useAppSelector, useCardsDataLoad, useGameViewsCalc } from 'hooks';
import {
  // для тестов
  // addMoneyForPlayer,
  // transferPropertyCard,
  leavePlayer,
  changeCurrentPlayer,
  changePositionPlayer,
  selectCardsData,
  selectCurrentPlayer,
  selectPlayers,
  selectRoot,
  writeResults,
} from 'app/slices/gameSlice';
import type { TypeUseGameViewsCalc } from 'hooks/useGameViewsCalc';
import { STREET } from 'game/types/cards';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from 'core/Router';
import { setGameDataLocalStorage } from 'app/slices/utils';
import { rollDices } from './helpers/helpers';
import { PlayerInterface } from './Views/PlayerInterface';
import { Dices } from './Views/Dices/Dices';
import { Map } from './Views/Map';
import type { TypeMapCardsData, TypeMapData } from './types/map';
import { NUMBER_CARDS } from './constants';

const GameRoot = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const gameViewsBlock = useRef<HTMLDivElement>(null!);

  const players = useAppSelector(selectPlayers);
  const root = useAppSelector(selectRoot);

  console.log(root);

  const cardsData = useAppSelector(selectCardsData);

  const [_cardsDataLoads, cardsImages] = useCardsDataLoad(cardsData);

  const mapParams: TypeUseGameViewsCalc = useGameViewsCalc();

  const currentPlayerStep = useAppSelector(selectCurrentPlayer);

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

  // CURRENT CARD ID не совпадает с canvas
  const changePlayer = (player?: number): boolean => {
    const winner = players.filter(({ leave }) => !leave);
    if (winner.length < 2) {
      alert(`Победитель: ${winner[0].name}`);
      dispatch(writeResults(winner[0].id));
      navigate(ROUTES.END_GAME_PAGE.path);

      return false;
    }
    const currentPlayer = player !== undefined ? player : currentPlayerStep;

    const nextPlayer = currentPlayer === null ? 0 : (currentPlayer + 1) % players.length;
    console.log(player);

    if (players[nextPlayer].leave) {
      changePlayer(nextPlayer);
    } else {
      dispatch(changeCurrentPlayer(nextPlayer));
    }

    return true;
  };

  const calcNewTarget = (id: number, steps: number) => {
    const oldTarget = players[id].currentCardId ?? 0;
    const target = steps + oldTarget;
    if (target > NUMBER_CARDS - 1) {
      return target - NUMBER_CARDS;
    }

    return target;
  };

  const clickStartPlayerTurn = () => {
    if (moveStep !== INITIAL) return;
    const dicesNumber = rollDices();
    nextMoveSteps(DIECES);
    // setDicesNumbers([1, 1]);
    setDicesNumbers(dicesNumber);
  };

  useEffect(() => {
    if (!players.length) return;
    console.log(root);

    setGameDataLocalStorage(root);
  }, [root]);

  useEffect(() => {
    if (players.length) return;
    navigate(ROUTES.START_GAME_PAGE.path);
  }, []);

  useEffect(() => {
    if (moveStep !== INITIAL) return;
    console.log('INITIAL');
    if (newTargetPlayer) {
      changePlayer();
      const { id, target: currentCardId } = newTargetPlayer;

      dispatch(changePositionPlayer({ id, currentCardId }));
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
    nextMoveSteps(INITIAL);
  }, [moveStep]);

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
  // для тестов
  const testBtn0 = () => {
    console.log(123123);
    // dispatch(transferPropertyCard({ cardId: 1, playerId: 0 }));
    // dispatch(transferPropertyCard({ cardId: 3, playerId: 0 }));
    // dispatch(transferPropertyCard({ cardId: 5, playerId: 0 }));
    dispatch(leavePlayer(0));
    dispatch(writeResults(0));
    // dispatch(addMoneyForPlayer({ amount: 3000, playerId: 0 }));
  };
  const testBtn1 = () => {
    // dispatch(transferPropertyCard({ cardId: 6, playerId: 1 }));
    // dispatch(transferPropertyCard({ cardId: 8, playerId: 1 }));
    // dispatch(transferPropertyCard({ cardId: 9, playerId: 1 }));
    dispatch(leavePlayer(1));
    dispatch(writeResults(1));
    // dispatch(addMoneyForPlayer({ amount: 100, playerId: 1 }));
  };
  const testBtn2 = () => {
    // dispatch(transferPropertyCard({ cardId: 39, playerId: 2 }));
    // dispatch(transferPropertyCard({ cardId: 37, playerId: 2 }));
    dispatch(leavePlayer(2));
    dispatch(writeResults(2));
    // dispatch(addMoneyForPlayer({ amount: 500, playerId: 2 }));
  };
  const testBtn3 = () => {
    // dispatch(transferPropertyCard({ cardId: 14, playerId: 3 }));
    // dispatch(transferPropertyCard({ cardId: 15, playerId: 3 }));
    dispatch(leavePlayer(3));
    dispatch(writeResults(3));
    // dispatch(addMoneyForPlayer({ amount: 500, playerId: 3 }));
  };
  const testBtn4 = () => {
    // dispatch(transferPropertyCard({ cardId: 21, playerId: 4 }));
    dispatch(leavePlayer(4));
    dispatch(writeResults(4));
    // dispatch(addMoneyForPlayer({ amount: 500, playerId: 4 }));
  };
  const testBtn5 = () => {
    // dispatch(transferPropertyCard({ cardId: 23, playerId: 5 }));
    dispatch(leavePlayer(5));
    dispatch(writeResults(5));
    // dispatch(addMoneyForPlayer({ amount: 200, playerId:5 }));
  };

  const CardsDataInterface = Object.values(cardsData).filter(({ property }) => property);

  return (
    <div className="game-views" ref={gameViewsBlock} style={{ height: mapSize, width: mapSize }}>
      <Dices
        dicesNumbers={dicesNumbers}
        stopRender={() => nextMoveSteps(MOVE)}
        render={moveStep === DIECES}
      />
      {/* для тестов */}
      <div style={{ position: 'absolute', zIndex: 10 }}>
        <button onClick={testBtn0} type="button">
          TEST0
        </button>
        <button onClick={testBtn1} type="button">
          TEST1
        </button>
        <button onClick={testBtn2} type="button">
          TEST2
        </button>
        <button onClick={testBtn3} type="button">
          TEST3
        </button>
        <button onClick={testBtn4} type="button">
          TEST4
        </button>
        <button onClick={testBtn5} type="button">
          TEST5
        </button>
      </div>
      <Map
        mapData={mapData}
        playerTarget={newTargetPlayer}
        render={moveStep === RENDER || moveStep === MOVE}
        stopRender={() =>
          // eslint-disable-next-line
          nextMoveSteps(moveStep === MOVE ? ACTION : moveStep === RENDER ? INITIAL : moveStep)
        }
      />
      <PlayerInterface
        blockRef={gameViewsBlock}
        players={players}
        cards={CardsDataInterface}
        size={interfaceSize}
        clickStartPlayerTurn={clickStartPlayerTurn}
      />
    </div>
  );
};

export const Game = GameRoot;
