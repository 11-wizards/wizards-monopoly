/* eslint @typescript-eslint/no-floating-promises: 0 */
import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { Typography } from 'antd';
import { CrownTwoTone } from '@ant-design/icons';
import type { LeaderboardPayer } from 'models/leaderboard.model';
import { leaderboardApi } from 'api/leaderboard.api';
import { LEADERBOARD_LIMIT, RATING_FIELD_NAME, TEAM_NAME } from 'constants/leaderboard';
import { messages } from './common';

import './Leaderboard.scss';

const { Title } = Typography;

export const Leaderboard: FC = () => {
  const { formatMessage: fm } = useIntl();
  const [leaderboardList, setLeaderboardList] = useState<Array<LeaderboardPayer>>([]);
  // const leaderboardList: Array<LeaderboardPayer> | [] = dataExample ?? [];

  useEffect(() => {
    leaderboardApi.getLeaderboard(TEAM_NAME, RATING_FIELD_NAME, LEADERBOARD_LIMIT).then((data) => {
      if (data.data) {
        setLeaderboardList(data.data);
      }
    });
  }, []);

  return (
    <div className="leaderboard">
      <Title level={2} className="leaderboard_title">
        {fm(messages.title)}
      </Title>
      <div className="leaderboard_players">
        {leaderboardList &&
          leaderboardList.map(({ data }, key) => (
            <div className="player" key={data.name}>
              <div className="player-content">
                <div className="place">
                  <Title level={2} className="place-title">
                    {!key ? <CrownTwoTone /> : key + 1}
                  </Title>
                </div>
                <div className="name">
                  <Title level={3} className="name-title">
                    {data.name}
                  </Title>
                </div>
                <div className="profit">
                  {data.profit} {fm(messages.profit)}
                </div>
                <div className="game-time">
                  {data.gameTime} {fm(messages.daysInGame)}
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
