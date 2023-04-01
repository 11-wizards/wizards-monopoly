import type { FC } from 'react';
import { Button, Layout, Typography } from 'antd';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from 'core/Router';
import { messages } from './i18n';

import './EndGame.scss';

const { Content } = Layout;

export const EndGame: FC = () => {
  const { formatMessage: fm } = useIntl();
  const navigate = useNavigate();

  const onFinishGameButtonClick = () => {
    navigate(ROUTES.ROOT.path);
  };

  const onPlayAgainButtonClick = () => {
    navigate(ROUTES.GAME_PAGE.path);
  };

  return (
    <Content className="end-game-content">
      <div className="end-game-layout">
        <section className="end-game-title">
          <Typography.Title>{fm(messages.endGameTitle)}</Typography.Title>
          <Typography.Paragraph className="end-game-winner">
            {fm(messages.endGameWinner)} Player_1
          </Typography.Paragraph>
        </section>
        <section className="end-game-buttons">
          <Button onClick={onFinishGameButtonClick} className="end-game-button" danger>
            {fm(messages.endGameFinish)}
          </Button>
          <Button onClick={onPlayAgainButtonClick} className="end-game-button" type="primary">
            {fm(messages.endGamePlayAgain)}
          </Button>
        </section>
      </div>
    </Content>
  );
};
