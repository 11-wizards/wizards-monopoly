import { type FC, useState } from 'react';
import { useIntl } from 'react-intl';
import { Button } from 'antd';
import { GlobalOutlined } from '@ant-design/icons';
import { GameRulesModal } from 'features/GameRulesModal';
import { useLocale } from 'hooks/useLocale';
import { messages } from './common';

import './Header.scss';

export const Header: FC = () => {
  const { formatMessage: fm } = useIntl();
  const [, toggleLocale] = useLocale();
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
        <GlobalOutlined className="app__languageToggle" onClick={toggleLocale} />
      </div>
      <GameRulesModal isOpen={isGameRulesShown} onClose={onShowRules} />
    </>
  );
};
