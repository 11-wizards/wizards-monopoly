import type { FC } from 'react';

import { Typography, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useIntl } from 'react-intl';
import { messages } from './i18n';

import './ResultBoard.scss';

const { Title } = Typography;

type ResultBoardItem = {
  gameTime: string;
  key: number;
  nick: string;
  place: number;
  profit: number;
  property: number;
};

// Mock data - will be removed on further sprints
const data: ResultBoardItem[] = [
  {
    key: 1,
    nick: 'Татьяна',
    place: 1,
    profit: 21000,
    property: 25,
    gameTime: '50:04',
  },
  {
    key: 2,
    nick: 'Иван',
    place: 2,
    profit: 17000,
    property: 25,
    gameTime: '50:04',
  },
  {
    key: 3,
    nick: 'Егор',
    place: 3,
    profit: 15000,
    property: 20,
    gameTime: '35:34',
  },
];

export const ResultBoard: FC = () => {
  const { formatMessage: fm } = useIntl();

  const columns: ColumnsType<ResultBoardItem> = [
    {
      title: fm(messages.resultBoardPlace),
      dataIndex: 'place',
      key: 'place',
    },
    {
      title: fm(messages.resultBoardName),
      dataIndex: 'nick',
      key: 'nick',
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

  return (
    <div className="resultboard-game">
      <Title level={2} className="resultboard-title">
        {fm(messages.resultBoardTitle)}
      </Title>
      <Table columns={columns} dataSource={data} pagination={false} className="resultboard-table" />
    </div>
  );
};
