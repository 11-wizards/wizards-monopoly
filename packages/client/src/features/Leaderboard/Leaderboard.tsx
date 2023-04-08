import type { FC } from 'react';
import { useIntl } from 'react-intl';
import { Typography } from 'antd';
import { CrownTwoTone } from '@ant-design/icons';
import { messages, data } from './common';

import './Leaderboard.scss';

const { Title } = Typography;

type LeaderboardPayer = {
  gameTime: string;
  nick: string;
  place: number;
  profit: number;
};

export const Leaderboard: FC = () => {
  const { formatMessage: fm } = useIntl();
  const leaderboardList: Array<LeaderboardPayer> | [] = data ?? [];

  return (
    <div className="leaderboard">
      <Title level={2} className="leaderboard_title">
        {fm(messages.title)}
      </Title>
      <div className="leaderboard_players">
        {leaderboardList &&
          leaderboardList.map((item) => (
            <div className="player" key={item.nick}>
              <div className="player-content">
                <div className="place">
                  <Title level={2} className="place-title">
                    {item.place === 1 ? <CrownTwoTone /> : item.place}
                  </Title>
                </div>
                <div className="nick">
                  <Title level={3} className="nick-title">
                    {item.nick}
                  </Title>
                </div>
                <div className="profit">
                  {item.profit} {fm(messages.profit)}
                </div>
                <div className="game-time">
                  {item.gameTime} {fm(messages.daysInGame)}
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
