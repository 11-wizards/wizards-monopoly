import { Typography } from 'antd';
import React from 'react';
import type { FC } from 'react';

import './TopicUserInfo.scss';

type TopicUserInfoProps = {
  authorName?: string;
  date: Date;
};

const { Paragraph, Text } = Typography;

export const TopicUserInfo: FC<TopicUserInfoProps> = ({ authorName, date }) => {
  const resDate = new Date(date).toDateString();

  return (
    <>
      <Paragraph className="topic-user-info__username">@{authorName}</Paragraph>
      <Text className="topic-user-info__date">{resDate}</Text>
    </>
  );
};
