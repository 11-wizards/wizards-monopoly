import { useEffect, useRef, useState } from 'react';

import type { StepsMove } from 'game/types/game';
import { DIECES, MOVE, INITIAL, RENDER, ACTION } from 'game/types/game';
import { useAppDispatch, useAppSelector, useCardsDataLoad, useGameViewsCalc } from 'hooks';
import {
  addMoneyForPlayer,
  transferPropertyCard,
  leavePlayer,
  changeCurrentPlayer,
  changePositionPlayer,
  selectCardsData,
  selectCurrentPlayer,
  selectPlayers,
  selectRoot,
  writeResults,
  selectRandomCards,
  deductMoneyFromPlayer,
  writeResultsWinner,
} from 'app/slices/gameSlice';
import type { TypeUseGameViewsCalc } from 'hooks/useGameViewsCalc';
import { ARREST, INFRASTRUCTURE, PRISON, RANDOM, STREET, TAX, ZERO } from 'game/types/cards';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from 'core/Router';
import { clearGameDataLocalStorage, setGameDataLocalStorage } from 'app/slices/utils';
// import { rollDices } from './helpers/helpers';
import { PlayerInterface } from './Views/PlayerInterface';
import { Dices } from './Views/Dices/Dices';
import { Map } from './Views/Map';
import type { TypeMapCardsData, TypeMapData } from './types/map';
import { NUMBER_CARDS } from './constants';
import { randomInt } from './helpers/cards';
import {
  leavePlayerModal,
  modalPlayerPropertyConfirm,
  modalRandomCard,
  modalTaxCard,
  noMoneyToBuy,
} from './helpers/modal';

const GameRoot = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const gameViewsBlock = useRef<HTMLDivElement>(null!);

  const players = useAppSelector(selectPlayers);
  const root = useAppSelector(selectRoot);
  const randomCards = useAppSelector(selectRandomCards);

  const cardsData = useAppSelector(selectCardsData);

  const [_cardsDataLoads, cardsImages] = useCardsDataLoad(cardsData);

  const mapParams: TypeUseGameViewsCalc = useGameViewsCalc();

  const currentPlayerStep = useAppSelector(selectCurrentPlayer);

  const [moveStep, setMoveStep] = useState<StepsMove>(RENDER);

  const [newTargetPlayer, setNewTargetPlayer] =
    useState<Nullable<{ id: number; target: number }>>(null);

  const [dicesNumbers, setDicesNumbers] = useState<Array<number>>([]);

  const checkSolvency = (playerId: number, amount = 0): boolean =>
    players[playerId].balance - amount >= 0;

  const leavePlayerGame = (playerId: number, name: string, next: () => void): void => {
    dispatch(leavePlayer(playerId));
    dispatch(writeResults(playerId));
    leavePlayerModal(name, next);
  };

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
      dispatch(writeResultsWinner(winner[0].id));
      clearGameDataLocalStorage();
      navigate(ROUTES.END_GAME_PAGE.path);

      return false;
    }
    const currentPlayer = player !== undefined ? player : currentPlayerStep;

    const nextPlayer = currentPlayer === null ? 0 : (currentPlayer + 1) % players.length;

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

    // ДЛЯ ДЕМО
    // const dicesNumber = rollDices();
    // setDicesNumbers(dicesNumber);

    if (currentPlayerStep === 0) {
      setDicesNumbers([1, 3]);
    } else if (currentPlayerStep === 1) {
      setDicesNumbers([2, 5]);
    } else {
      setDicesNumbers([5, 6]);
    }
    // ДЛЯ ДЕМО

    nextMoveSteps(DIECES);
  };

  useEffect(() => {
    if (!players.length) return;
    setGameDataLocalStorage(root);
  }, [root]);

  useEffect(() => {
    if (players.length) return;
    navigate(ROUTES.START_GAME_PAGE.path);
  }, []);

  useEffect(() => {
    if (moveStep !== INITIAL) return;
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

    const target = calcNewTarget(id, steps);
    dispatch(changePositionPlayer({ id, currentCardId: target }));
    setNewTargetPlayer({ id, target });
  }, [moveStep]);

  useEffect(() => {
    if (moveStep !== ACTION) return;
    if (!newTargetPlayer || !cardsData || currentPlayerStep === null) return;

    const cardId = players[currentPlayerStep].currentCardId;
    const currentCard = cardsData[cardId];

    switch (currentCard.type) {
      case ZERO: {
        nextMoveSteps(INITIAL);

        return;
      }
      case STREET: {
        const { title, property, price = 0 } = currentCard;
        if (property) {
          nextMoveSteps(INITIAL);

          return;
        }

        const addProperyStreet = () => {
          dispatch(deductMoneyFromPlayer({ amount: price, playerId: currentPlayerStep }));
          dispatch(transferPropertyCard({ cardId, playerId: currentPlayerStep }));
          nextMoveSteps(RENDER);
        };

        if (checkSolvency(currentPlayerStep, price)) {
          modalPlayerPropertyConfirm({ title, price }, addProperyStreet, () => {
            nextMoveSteps(INITIAL);
          });
        } else {
          noMoneyToBuy(title, () => nextMoveSteps(INITIAL));
        }

        return;
      }
      case PRISON: {
        nextMoveSteps(INITIAL);

        return;
      }
      case ARREST: {
        nextMoveSteps(INITIAL);

        return;
      }
      case INFRASTRUCTURE: {
        nextMoveSteps(INITIAL);

        return;
      }
      case TAX: {
        const { price: amount = 0, title } = currentCard;

        const cardActionDebt = () => {
          dispatch(deductMoneyFromPlayer({ amount, playerId: currentPlayerStep }));
          if (!checkSolvency(currentPlayerStep, amount)) {
            leavePlayerGame(currentPlayerStep, players[currentPlayerStep].name, () =>
              nextMoveSteps(INITIAL),
            );
          } else {
            nextMoveSteps(INITIAL);
          }
        };

        modalTaxCard(
          {
            title,
            amount,
          },
          cardActionDebt,
        );

        return;
      }
      case RANDOM: {
        const { credit, debt, desc } = randomCards[randomInt(randomCards.length - 1)];

        const cardActionDebt = () => {
          dispatch(deductMoneyFromPlayer({ amount: debt || 0, playerId: currentPlayerStep }));
          if (!checkSolvency(currentPlayerStep, debt)) {
            leavePlayerGame(currentPlayerStep, players[currentPlayerStep].name, () =>
              nextMoveSteps(INITIAL),
            );
          } else {
            nextMoveSteps(INITIAL);
          }
        };
        const cardActionCredit = () => {
          dispatch(addMoneyForPlayer({ amount: credit || 0, playerId: currentPlayerStep }));
          nextMoveSteps(INITIAL);
        };
        modalRandomCard(
          {
            title: 'Казна/шанс',
            credit: credit || 0,
            debt: debt || 0,
            desc,
          },
          credit ? cardActionCredit : cardActionDebt,
        );

        return;
      }
      default:
        nextMoveSteps(INITIAL);
    }
  }, [moveStep]);

  if (!mapParams || !cardsData || !cardsImages) return <>ЗАГРУЗКА КАРТЫ!</>;
  const { mapSize, playerSize, cards, interfaceSize } = mapParams;

  const mapCardsData: Array<TypeMapCardsData> = cards.map((card, key) => ({
    ...card,
    img: cardsImages[key],
    id: key,
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
