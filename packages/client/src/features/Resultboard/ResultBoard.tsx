/* eslint-disable @typescript-eslint/no-floating-promises */
import type { FC } from 'react';
import { useEffect } from 'react';
import { Typography, Table } from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import { useIntl } from 'react-intl';
import { fetchNewLeader } from 'app/slices/leaderboardSlice';
import { useAppDispatch } from 'hooks';
import type { GamePlayerResult } from 'game/types/game';
import { messages } from './i18n';

import './ResultBoard.scss';

const { Title } = Typography;

type PropsResultBoard = {
  results: Nullable<GamePlayerResult[]>;
};
// Mock data - will be removed on further sprints

export const ResultBoard: FC<PropsResultBoard> = ({ results }) => {
  const { formatMessage: fm } = useIntl();

  const dispatch = useAppDispatch();

  const columns: ColumnsType<GamePlayerResult> = [
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
    if (!results?.length) return;
    const { gameTime, name, profit } = results[0];
    dispatch(fetchNewLeader({ gameTime: gameTime ?? '', name, profit }));
  }, []);

  return (
    <div className="resultboard-game">
      <Title level={2} className="resultboard-title">
        {fm(messages.resultBoardTitle)}
      </Title>
      <Table
        columns={columns}
        dataSource={results ?? []}
        pagination={false}
        className="resultboard-table"
      />
    </div>
  );
};
