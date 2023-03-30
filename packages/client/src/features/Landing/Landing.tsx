import type { FC } from 'react';
import { Button, Layout, Typography } from 'antd';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../core/Router';
import { useAppSelector } from '../../app/store';
import { selectIsLoggedIn } from '../../app/slices/userSlice';
import { messages } from '../Register/common';

import './Landing.scss';

const { Content } = Layout;

export const Landing: FC = () => {
  const { formatMessage: fm } = useIntl();
  const navigate = useNavigate();
  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  const onPlayButtonClick = () => {
    if (isLoggedIn) {
      navigate(ROUTES.START_GAME_PAGE.path);
    } else {
      navigate(ROUTES.LOGIN_PAGE.path);
    }
  };

  return (
    <Content className="layout">
      <Layout className="content">
        <div className="title-header">
          <Typography className="title">{fm(messages.landingTitle)}</Typography>
        </div>
        <div className="subtitle-layout">
          <Typography className="subtitle">{fm(messages.landingSubtitle)}</Typography>
          <Typography.Text className="title__description">
            {fm(messages.landingSubtitleDescription)}
          </Typography.Text>
        </div>
        <div className="call-to-action">
          <Button onClick={onPlayButtonClick} className="play-button" type="primary">
            {fm(messages.landingPlayButton)}
          </Button>
        </div>
        <div className="features">
          <div className="feature-item">
            <Typography.Text className="feature-text">
              {fm(messages.landingFeature1)}
            </Typography.Text>
          </div>
          <div className="feature-item">
            <Typography.Text className="feature-text">
              {fm(messages.landingFeature2)}
            </Typography.Text>
          </div>
          <div className="feature-item">
            <Typography.Text className="feature-text">
              {fm(messages.landingFeature3)}
            </Typography.Text>
          </div>
          <div className="feature-item">
            <Typography.Text className="feature-text">
              {fm(messages.landingFeature4)}
            </Typography.Text>
          </div>
          <div className="feature-item">
            <Typography.Text className="feature-text">
              {fm(messages.landingFeature5)}
            </Typography.Text>
          </div>
        </div>
      </Layout>
    </Content>
  );
};
