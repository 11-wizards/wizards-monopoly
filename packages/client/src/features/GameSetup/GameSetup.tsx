import type { FC } from 'react';
import { Button, Input, InputNumber, Form } from 'antd';
import { useIntl } from 'react-intl';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setNumberOfPlayers } from 'app/slices/gameSlice';
import { messages } from './i18n';

const createPlayersArray = (length: Nullable<number>) =>
  Array.from({ length: length || 0 }).map((_, i) => ({
    id: `${i}-player`,
  }));

const GameSetup: FC = () => {
  const [players, setPlayers] = useState(createPlayersArray(2));
  const dispatch = useDispatch();
  const { formatMessage: fm } = useIntl();

  const handlePlayersChange = (number: Nullable<number>) => {
    if (!number) {
      return;
    }

    setPlayers(createPlayersArray(number));
  };

  const handleButtonClick = () => {
    dispatch(setNumberOfPlayers(players.length));
  };

  return (
    <Form layout="vertical">
      <Form.Item label={fm(messages.textChoose)}>
        <InputNumber defaultValue={2} min={2} max={4} onChange={handlePlayersChange} />
      </Form.Item>
      {players.map(({ id }, i) => (
        <Form.Item label={fm(messages.playerName, { numPlayer: i + 1 })} key={id}>
          <Input />
        </Form.Item>
      ))}
      <Form.Item>
        <Button type="primary" onClick={handleButtonClick}>
          {fm(messages.buttonStart)}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default GameSetup;
