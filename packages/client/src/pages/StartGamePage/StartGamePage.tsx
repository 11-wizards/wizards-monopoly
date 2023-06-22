import { GameSetup } from 'features/GameSetup/GameSetup';
import type { FC } from 'react';
import { useIntl } from 'react-intl';
import { Layout, Row, Col, Typography, Space } from 'antd';

import { messages } from 'pages/StartGamePage/common';

import './StartGamePage.scss';

export const StartGamePage: FC = () => {
  const { formatMessage: fm } = useIntl();

  return (
    <Layout className="start-game-page">
      <Row justify="center">
        <Col span={8}>
          <Space className="start-game-page__wrapper" direction="vertical">
            <Typography.Title style={{ textAlign: 'center' }}>
              {fm(messages.titleWelcome)}
            </Typography.Title>
            <GameSetup />
            {/* <Typography.Text type="warning">{fm(messages.textNote)}</Typography.Text> */}
          </Space>
        </Col>
      </Row>
    </Layout>
  );
};
