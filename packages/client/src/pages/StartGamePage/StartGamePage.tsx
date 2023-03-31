import type { FC } from 'react';
import { useIntl } from 'react-intl';
import { Layout, Row, Col, Typography, Space } from 'antd';
import GameSetup from 'features/GameSetup/GameSetup';

import { messages } from './i18n';

import './StartGamePage.scss';

export const StartGamePage: FC = () => {
  const { formatMessage: fm } = useIntl();

  return (
    <Layout className="welcome-page">
      <Row justify="center">
        <Col span={12}>
          <Space direction="vertical">
            <Row>
              <Col span={16}>
                <Typography.Title>{fm(messages.titleWelcome)}</Typography.Title>
                <GameSetup />
                <Typography.Text type="secondary">{fm(messages.textNote)}</Typography.Text>
              </Col>
            </Row>
          </Space>
        </Col>
      </Row>
    </Layout>
  );
};
