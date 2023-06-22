import { useEffect, type FC } from 'react';
import { Button, Layout, Typography } from 'antd';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from 'core/Router';
import { ResultBoard } from 'features/Resultboard';
import { resetStore, selectResults } from 'app/slices/gameSlice';
import { useAppDispatch, useAppSelector } from 'hooks';
import { messages } from './common';

import './EndGame.scss';

const { Content } = Layout;

export const EndGame: FC = () => {
  const { formatMessage: fm } = useIntl();
  const navigate = useNavigate();

  const results = useAppSelector(selectResults);
  const dispatch = useAppDispatch();

  const onFinishGameButtonClick = () => {
    dispatch(resetStore());
    navigate(ROUTES.ROOT.path);
  };

  const onPlayAgainButtonClick = () => {
    dispatch(resetStore());
    navigate(ROUTES.GAME_PAGE.path);
  };

  const onPlayViewLeaderBoardButtonClick = () => {
    dispatch(resetStore());
    navigate(ROUTES.LEADERBOARD_PAGE.path);
  };

  useEffect(() => {
    if (!results) {
      navigate(ROUTES.START_GAME_PAGE.path);
    }
  }, []);

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
