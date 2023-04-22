import { useEffect, useState } from 'react';

import './Dice.scss';

type Props = {
  number: number;
  offset: number;
  resetKey: number;
  speed: number;
  stopAnimate: () => void;
};

export const Dice = ({
  speed,
  number,
  offset,
  resetKey,
  stopAnimate,
}: Props): JSX.Element | null => {
  const [view, setView] = useState(false);

  const endDiceAnimation = (): void => {
    setView(false);
    stopAnimate();
  };

  const offsetStyle = {
    left: `calc(50% + ${offset}px)`,
  };
  const animationStyle = {
    animation: `rotate${number} ${speed}s`,
  };

  useEffect(() => {
    if (!resetKey) return;
    setView(true);
  }, [resetKey]);
  if (!number) return null;

  return (
    <div
      className={`dice ${view ? 'view rotate' : ''} number-${number} `}
      style={view ? { ...animationStyle, ...offsetStyle } : { ...offsetStyle }}
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
