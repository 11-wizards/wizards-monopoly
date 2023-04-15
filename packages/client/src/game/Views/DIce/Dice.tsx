import { useEffect, useState } from 'react';

import './Dice.scss';

type Props = {
  speed: number;
  number: number;
  offset: number;
  diceId: number;
  resetKey: number;
  stopAnimate: () => void;
};

export const Dice = ({
  speed = 2,
  number = 6,
  offset,
  diceId = 0,
  resetKey = 0,
  stopAnimate,
}: Props): JSX.Element | null => {
  const [view, setView] = useState(false);

  /* eslint-disable */
  const endDiceAnimation = (e: any) => {
    const elem = e?.target as HTMLElement;
    if (Number(elem?.dataset?.diceId) === diceId) {
      setView(false);
      stopAnimate();
    }
  };
  /* eslint-enable */

  const offsetStyle = {
    left: `calc(50% + ${offset}px)`,
  };
  const animationStyle = {
    animation: `rotate${number} ${speed}s`,
  };

  // useEffect(() => {
  //   addEventListener('animationend', endDiceAnimation);
  //   return () => removeEventListener('animationend', endDiceAnimation);
  // }, []);

  useEffect(() => {
    if (!resetKey) return;
    setView(true);
  }, [resetKey]);
  if (!number) return null;

  return (
    <div
      className={`dice ${view ? 'view rotate' : ''} number-${number} `}
      style={view ? { ...animationStyle, ...offsetStyle } : { ...offsetStyle }}
      data-dice-id={diceId}
      onAnimationEnd={endDiceAnimation}
    >
      <div className="one side">
        <span className="pip" />
      </div>
      <div className="two side">
        <span className="pip" />
        <span className="pip pip-two" />
      </div>
      <div className="three side">
        <span className="pip" />
        <span className="pip pip-two" />
        <span className="pip pip-three" />
      </div>

      <div className="four side">
        <div className="column">
          <span className="pip" />
          <span className="pip" />
        </div>
        <div className="column">
          <span className="pip" />
          <span className="pip" />
        </div>
      </div>
      <div className="five side">
        <div className="column">
          <span className="pip" />
          <span className="pip" />
        </div>
        <div className="column column-two">
          <span className="pip" />
        </div>
        <div className="column">
          <span className="pip" />
          <span className="pip" />
        </div>
      </div>
      <div className="six side">
        <div className="column">
          <span className="pip" />
          <span className="pip" />
          <span className="pip" />
        </div>
        <div className="column">
          <span className="pip" />
          <span className="pip" />
          <span className="pip" />
        </div>
      </div>
    </div>
  );
};
