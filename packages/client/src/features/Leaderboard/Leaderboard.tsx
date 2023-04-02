import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';

import { Typography } from 'antd';
import { CrownTwoTone } from '@ant-design/icons';
import { messages } from './common';

import './Leaderboard.scss';

const { Title } = Typography;

type LeaderboardList = {
  place: number;
  nick: string;
  profit: number;
  gameTime: string;
};

const data = [
  {
    nick: 'Илья',
    place: 1,
    profit: 500000,
    gameTime: '150',
  },
  {
    nick: 'Анна',
    place: 2,
    profit: 62000,
    gameTime: '1 день',
  },
  {
    nick: 'Евгений',
    place: 3,
    profit: 16000,
    gameTime: '110',
  },
  {
    nick: 'Андрей',
    place: 4,
    profit: 15000,
    gameTime: '100',
  },
  {
    nick: 'Антон',
    place: 5,
    profit: 14000,
    gameTime: '10',
  },
  {
    nick: 'Мария',
    place: 6,
    profit: 13400,
    gameTime: '500',
  },
  {
    nick: 'Елена',
    place: 7,
    profit: 12000,
    gameTime: '100',
  },
  {
    nick: 'Тимур',
    place: 8,
    profit: 12000,
    gameTime: '123',
  },
  {
    nick: 'Константин',
    place: 9,
    profit: 10450,
    gameTime: '67',
  },
  {
    nick: 'Сергей',
    place: 10,
    profit: 10220,
    gameTime: '58',
  },
];

export const Leaderboard: FC = () => {
  const { formatMessage: fm } = useIntl();

  const [leaderboardList, setLiderboardList] = useState<Array<LeaderboardList>>([]);

  useEffect(() => {
    //     axios.get('')
    //         .then(result => {
    //             const { data } = result;
    //             if (Array.isArray(data)) {
    //                 setLiderboardList(data);
    //             }
    //         })
    setLiderboardList(data);
  }, []);

  return (
    <div>
      <Title level={2} className="liderboard-title">
        {fm(messages.title)}
      </Title>
      <div className="grid-players">
        {leaderboardList &&
          leaderboardList.map((item, key) => (
            <div className="player" key={item.place}>
              <div className="player-content">
                <div className="place">
                  <Title level={2}>{item.place === 1 ? <CrownTwoTone /> : item.place}</Title>
                </div>
                <div className="nick">
                  <Title level={3}>{item.nick}</Title>
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
