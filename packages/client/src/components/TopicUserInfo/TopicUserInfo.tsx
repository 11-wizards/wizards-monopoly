import { Typography } from 'antd';
import React from 'react';
import type { FC } from 'react';

import './TopicUserInfo.scss';

type TopicUserInfoProps = {
  authorName?: string;
  date: Date;
};
export const TopicUserInfo: FC<TopicUserInfoProps> = ({ authorName, date }) => (
  <>
    <Typography.Paragraph className="topic-user-info__username">@{authorName}</Typography.Paragraph>
    <Typography.Text className="topic-user-info__date">{date}</Typography.Text>
  </>
);
