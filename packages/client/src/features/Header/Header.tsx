import type { FC } from 'react';
import React, { useState } from 'react';
import { Button } from 'antd';
import { useIntl } from 'react-intl';
import { GameRulesModal } from '../GameRulesModal';
import { messages } from './common';

import './Header.scss';

export const Header: FC = () => {
  const { formatMessage: fm } = useIntl();
  const [isGameRulesShown, setGameRuleShown] = useState(false);

  const onShowRulesButtonClick = () => {
    setGameRuleShown(true);
  };

  return (
    <div className="header">
      <Button onClick={onShowRulesButtonClick} type="dashed">
        {fm(messages.headerRulesButton)}
      </Button>
      <GameRulesModal isOpen={isGameRulesShown} onClose={() => setGameRuleShown(false)} />
    </div>
  );
};
