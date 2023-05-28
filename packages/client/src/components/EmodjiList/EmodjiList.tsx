/* eslint-disable */
import { type FC } from 'react';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import axios from 'axios';

type EmodjiListProps = {
  topicId: number;
};

export const EmodjiList: FC<EmodjiListProps> = ({ topicId }) => {
  const sendEmodji = (id: number, emotion: any) => {
    axios.post(`/topics/${id}/emotion`, {
      emotion,
    });
  };

  return <Picker data={data} onEmojiSelect={(data: any) => sendEmodji(topicId, data.native)} />;
};
