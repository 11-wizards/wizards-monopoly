/* eslint-disable @typescript-eslint/no-floating-promises */
import type { FC } from 'react';
import { useEffect } from 'react';
import { Typography, Table } from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import { useIntl } from 'react-intl';
import { fetchNewLeader } from 'app/slices/leaderboardSlice';
import { useAppDispatch } from 'hooks';
import { messages } from './i18n';

import './ResultBoard.scss';

const { Title } = Typography;

type ResultBoardItem = {
  gameTime: string;
  key: number;
  name: string;
  place: number;
  profit: number;
  property: number;
};

// Mock data - will be removed on further sprints
const data: ResultBoardItem[] = [
  {
    key: 1,
    name: 'Татьяна',
    place: 1,
    profit: 21000,
    property: 25,
    gameTime: '50:04',
  },
  {
    key: 2,
    name: 'Иван',
    place: 2,
    profit: 17000,
    property: 25,
    gameTime: '50:04',
  },
  {
    key: 3,
    name: 'Егор',
    place: 3,
    profit: 15000,
    property: 20,
    gameTime: '35:34',
  },
];

export const ResultBoard: FC = () => {
  const { formatMessage: fm } = useIntl();

  const dispatch = useAppDispatch();

  const columns: ColumnsType<ResultBoardItem> = [
    {
      title: fm(messages.resultBoardPlace),
      dataIndex: 'place',
      key: 'place',
    },
    {
      title: fm(messages.resultBoardName),
      dataIndex: 'name',
      key: 'name',
      render: (text) => <span>{text}</span>,
    },
    {
      title: fm(messages.resultBoardProfit),
      dataIndex: 'profit',
      render: (value) => <span>{value} $</span>,
      key: 'profit',
    },
    {
      title: fm(messages.resultBoardProperty),
      dataIndex: 'property',
      key: 'property',
    },
    {
      title: fm(messages.resultBoardTime),
      dataIndex: 'gameTime',
      key: 'gameTime',
    },
  ];

  useEffect(() => {
    if (!data.length) return;
    const { gameTime, name, profit } = data[0];
    dispatch(fetchNewLeader({ gameTime, name, profit }));
  }, []);

  return (
    <div className="resultboard-game">
      <Title level={2} className="resultboard-title">
        {fm(messages.resultBoardTitle)}
      </Title>
      <Table columns={columns} dataSource={data} pagination={false} className="resultboard-table" />
    </div>
  );
};
