import type { FC } from 'react';
import { Button, Layout, Typography } from 'antd';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from 'core/Router';
import { showGameRules } from 'app/slices/gameSettingsSlice';
import { selectIsAuth } from 'app/slices/userSlice';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { messages } from './i18n';

import './Landing.scss';

const { Content } = Layout;

export const Landing: FC = () => {
  const dispatch = useAppDispatch();
  const { formatMessage: fm } = useIntl();
  const navigate = useNavigate();
  const isAuth = useAppSelector(selectIsAuth);

  const onPlayButtonClick = () => {
    if (isAuth) {
      navigate(ROUTES.START_GAME_PAGE.path);
    } else {
      navigate(ROUTES.LOGIN_PAGE.path);
    }
  };

  const onRulesButtonClick = () => {
    dispatch(showGameRules());
  };

  return (
    <Content className="landing-layout">
      <Layout className="landing-content">
        <div className="landing-title-header">
          <Typography className="landing-title">{fm(messages.landingTitle)}</Typography>
        </div>
        <div className="landing-subtitle-layout">
          <Typography className="landing-subtitle">{fm(messages.landingSubtitle)}</Typography>
          <Typography.Text className="title__description">
            {fm(messages.landingSubtitleDescription)}
          </Typography.Text>
        </div>
        <div className="landing-buttons-container">
          <Button onClick={onPlayButtonClick} className="landing-play-button" type="primary">
            {fm(messages.landingPlayButton)}
          </Button>
          <Button onClick={onRulesButtonClick} className="landing-rules-button" type="dashed">
            {fm(messages.landingRulesButton)}
          </Button>
        </div>
        <div className="landing-features">
          <div className="landing-feature-item">
            <Typography.Text className="feature-text">
              {fm(messages.landingFeature1)}
            </Typography.Text>
          </div>
          <div className="landing-feature-item">
            <Typography.Text className="feature-text">
              {fm(messages.landingFeature2)}
            </Typography.Text>
          </div>
          <div className="landing-feature-item">
            <Typography.Text className="feature-text">
              {fm(messages.landingFeature3)}
            </Typography.Text>
          </div>
          <div className="landing-feature-item">
            <Typography.Text className="feature-text">
              {fm(messages.landingFeature4)}
            </Typography.Text>
          </div>
          <div className="landing-feature-item">
            <Typography.Text className="feature-text">
              {fm(messages.landingFeature5)}
            </Typography.Text>
          </div>
        </div>
      </Layout>
    </Content>
  );
};
