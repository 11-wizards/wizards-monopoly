import type { FC } from 'react';
import { resetDices } from 'game/helpers/helpers';
import { useEffect, useState } from 'react';
import { Dice } from './Dice';

type DicesProps = {
  dicesNumbers: Array<number>;
  render: boolean;
  stopRender: () => void;
};
type TypeDice = {
  number: number;
  offset: number;
  resetKey: number;
  speed: number;
};

export const Dices: FC<DicesProps> = ({ dicesNumbers, stopRender, render }) => {
  const [animateOneDice, setAnimateOneDice] = useState<boolean>(true);
  const [animateTwoDice, setAnimateTwoDice] = useState<boolean>(true);

  const [diceOne, setDiceOne] = useState<TypeDice>({
    offset: 150,
    number: 0,
    resetKey: 0,
    speed: 2,
  });
  const [diceTwo, setDiceTwo] = useState<TypeDice>({
    offset: -130,
    number: 0,
    resetKey: 0,
    speed: 3,
  });

  const stopAnimateOneDice = (): void => setAnimateOneDice(false);
  const stopAnimateTwoDice = (): void => setAnimateTwoDice(false);

  const startAnimateDices = (dicesNumbersArr: Array<number>): void => {
    if (!dicesNumbersArr.length) return;
    setAnimateOneDice(true);
    setAnimateTwoDice(true);
    setDiceOne((prev) => ({ ...prev, number: dicesNumbersArr[0], resetKey: resetDices() }));
    setDiceTwo((prev) => ({ ...prev, number: dicesNumbersArr[1], resetKey: resetDices() }));
  };

  useEffect(() => {
    if (!render) return;
    if (!Array.isArray(dicesNumbers)) return;
    startAnimateDices(dicesNumbers);
  }, [dicesNumbers]);

  useEffect(() => {
    if (animateOneDice || animateTwoDice) return;
    stopRender();
  }, [animateOneDice, animateTwoDice]);

  return (
    <>
      <Dice {...diceOne} stopAnimate={stopAnimateOneDice} />
      <Dice {...diceTwo} stopAnimate={stopAnimateTwoDice} />
    </>
  );
};
