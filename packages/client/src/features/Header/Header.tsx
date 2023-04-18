import type { FC } from 'react';
import { useState } from 'react';
import { Button } from 'antd';
import { useIntl } from 'react-intl';
import { GameRulesModal } from 'features/GameRulesModal';
import { messages } from './common';

import './Header.scss';

export const Header: FC = () => {
  const { formatMessage: fm } = useIntl();
  const [isGameRulesShown, setGameRuleShown] = useState(false);

  const onShowRules = () => {
    setGameRuleShown((prevState) => !prevState);
  };

  return (
    <>
      <div className="header">
        <Button onClick={onShowRules} type="dashed">
          {fm(messages.headerRulesButton)}
        </Button>
      </div>
      <GameRulesModal isOpen={isGameRulesShown} onClose={onShowRules} />
    </>
  );
};
