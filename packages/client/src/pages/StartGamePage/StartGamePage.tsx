import type { FC } from 'react';
import { useIntl } from 'react-intl';
import { Layout, Row, Col, Typography, Space } from 'antd';
import { GameSetup } from 'features/GameSetup/GameSetup';

import { messages } from './i18n';

import './StartGamePage.scss';

export const StartGamePage: FC = () => {
  const { formatMessage: fm } = useIntl();

  return (
    <Layout className="start-game-page">
      <Row justify="center">
        <Col span={8}>
          <Space direction="vertical">
            <Typography.Title>{fm(messages.titleWelcome)}</Typography.Title>
            <GameSetup />
            <Typography.Text type="warning">{fm(messages.textNote)}</Typography.Text>
          </Space>
        </Col>
      </Row>
    </Layout>
  );
};
