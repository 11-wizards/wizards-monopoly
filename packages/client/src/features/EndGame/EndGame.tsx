import type { FC } from 'react';
import { Button, Layout, Typography } from 'antd';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from 'core/Router';
import { ResultBoard } from 'features/Resultboard';
import { selectResults } from 'app/slices/gameSlice';
import { useAppSelector } from 'hooks';
import { messages } from './common';

import './EndGame.scss';

const { Content } = Layout;

export const EndGame: FC = () => {
  const { formatMessage: fm } = useIntl();
  const navigate = useNavigate();

  const results = useAppSelector(selectResults);

  const onFinishGameButtonClick = () => {
    navigate(ROUTES.ROOT.path);
  };

  const onPlayAgainButtonClick = () => {
    navigate(ROUTES.GAME_PAGE.path);
  };

  const onPlayViewLeaderBoardButtonClick = () => {
    navigate(ROUTES.LEADERBOARD_PAGE.path);
  };

  return (
    <Content className="end-game-content">
      <div className="end-game-layout">
        <section className="end-game-title">
          <Typography.Title>{fm(messages.endGameTitle)}</Typography.Title>
          <Typography.Text className="end-game-winner">
            {fm(messages.endGameWinner)} {results && results[0].name}
          </Typography.Text>
        </section>
        <ResultBoard results={results} />
        <section className="end-game-buttons">
          <Button onClick={onFinishGameButtonClick} className="end-game-button" danger>
            {fm(messages.endGameFinish)}
          </Button>
          <Button onClick={onPlayAgainButtonClick} className="end-game-button" type="primary">
            {fm(messages.endGamePlayAgain)}
          </Button>
          <Button
            onClick={onPlayViewLeaderBoardButtonClick}
            className="end-game-button"
            type="primary"
          >
            {fm(messages.endGameViewLeaderBoard)}
          </Button>
        </section>
      </div>
    </Content>
  );
};
