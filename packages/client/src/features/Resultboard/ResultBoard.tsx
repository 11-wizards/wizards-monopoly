/* eslint-disable @typescript-eslint/no-floating-promises */
import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { Typography, Table } from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import { useIntl } from 'react-intl';
import { fetchNewLeader } from 'app/slices/leaderboardSlice';
import { useAppDispatch, useAppSelector } from 'hooks';
import { selectResults } from 'app/slices/gameSlice';
import type { GamePlayerResult } from 'game/types/game';
import { messages } from './i18n';

import './ResultBoard.scss';

const { Title } = Typography;

// Mock data - will be removed on further sprints

export const ResultBoard: FC = () => {
  const { formatMessage: fm } = useIntl();

  const dispatch = useAppDispatch();
  const [resultsSort, setResultsSort] = useState<GamePlayerResult[]>([]);
  const results = useAppSelector(selectResults);

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
    console.log(results);
    const sortResults = [...results].sort((a, b) => {
      if (typeof a.place !== 'number' || typeof b.place !== 'number') return 0;
      console.log(a.place - b.place);

      return a.place - b.place;
    });
    setResultsSort(sortResults);
    const { gameTime, name, profit } = sortResults[0];

    dispatch(fetchNewLeader({ gameTime: gameTime ?? '', name, profit }));
  }, []);

  return (
    <div className="resultboard-game">
      <Title level={2} className="resultboard-title">
        {fm(messages.resultBoardTitle)}
      </Title>
      <Table
        columns={columns}
        dataSource={resultsSort}
        pagination={false}
        className="resultboard-table"
      />
    </div>
  );
};
