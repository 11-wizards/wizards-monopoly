import type { FC } from 'react';
import { resetDices } from 'game/helpers/helpers';
import { useEffect, useState } from 'react';
import type { StepsMove } from 'game/types/game';
import { DIECES } from 'game/types/game';
import { Dice } from './Dice';

type DicesProps = {
  dicesNumbers: Array<number>;
  moveStep: StepsMove;
  nextStep: () => void;
};
type Dice = {
  number: number;
  offset: number;
  resetKey: number;
  speed: number;
};

export const Dices: FC<DicesProps> = ({ dicesNumbers, nextStep, moveStep }) => {
  const [animateOneDice, setAnimateOneDice] = useState<boolean>(true);
  const [animateTwoDice, setAnimateTwoDice] = useState<boolean>(true);

  const [diceOne, setDiceOne] = useState<Dice>({
    offset: 150,
    number: 0,
    resetKey: 0,
    speed: 2,
  });
  const [diceTwo, setDiceTwo] = useState<Dice>({
    offset: -130,
    number: 0,
    resetKey: 0,
    speed: 3,
  });

  const stopAnimateOneDice = (): void => setAnimateOneDice(false);
  const stopAnimateTwoDice = (): void => setAnimateTwoDice(false);

  const startAnimateDices = (dicesNumbers: Array<number>): void => {
    if (!dicesNumbers.length) return;
    setAnimateOneDice(true);
    setAnimateTwoDice(true);
    setDiceOne((prev) => ({ ...prev, number: dicesNumbers[0], resetKey: resetDices() }));
    setDiceTwo((prev) => ({ ...prev, number: dicesNumbers[1], resetKey: resetDices() }));
  };

  useEffect(() => {
    if (moveStep !== DIECES) return;
    if (!Array.isArray(dicesNumbers)) return;
    startAnimateDices(dicesNumbers);
  }, [dicesNumbers]);

  useEffect(() => {
    if (animateOneDice || animateTwoDice) return;
    nextStep();
  }, [animateOneDice, animateTwoDice]);

  return (
    <>
      <Dice {...diceOne} stopAnimate={stopAnimateOneDice} />
      <Dice {...diceTwo} stopAnimate={stopAnimateTwoDice} />
    </>
  );
};
