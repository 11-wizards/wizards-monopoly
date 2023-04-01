import type { FC } from 'react';
import { Button, Input, InputNumber, Form, Typography } from 'antd';
import { useIntl } from 'react-intl';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setNumberOfPlayers, setPlayerName } from 'app/slices/gameSlice';
import { Controller, useForm } from 'react-hook-form';
import { MIN_NUMBER_OF_PLAYERS, MAX_NUMBER_OF_PLAYERS } from 'constants/main';
import { messages } from './i18n';
import { ROUTES } from '../../core/Router';

type FormValues = {
  [name: string]: string;
};

const createPlayersArray = (length: Nullable<number>) =>
  Array.from({ length: length || 0 }).map((_, i) => ({
    id: `${i}-player`,
  }));

const GameSetup: FC = () => {
  const [players, setPlayers] = useState(createPlayersArray(2));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { formatMessage: fm } = useIntl();
  const {
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<FormValues>({
    mode: 'onBlur',
  });
  const handlePlayersChange = (number: Nullable<number>) => {
    if (!number) {
      return;
    }

    setPlayers(createPlayersArray(number));
  };

  const handleFormSubmit = (data: FormValues) => {
    dispatch(setNumberOfPlayers(players.length));
    dispatch(setPlayerName(data));
    reset();

    navigate(ROUTES.GAME_PAGE.path);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <Form.Item label={fm(messages.textChoose)}>
        <InputNumber
          defaultValue={players.length}
          min={MIN_NUMBER_OF_PLAYERS}
          max={MAX_NUMBER_OF_PLAYERS}
          onChange={handlePlayersChange}
        />
      </Form.Item>
      {players.map(({ id }, i) => {
        const inputName = `player_name_${i + 1}`;
        return (
          <Form.Item
            key={id}
            label={fm(messages.playerName, { num: i + 1 })}
            wrapperCol={{ span: 18 }}
          >
            <Controller
              name={inputName}
              control={control}
              rules={{
                required: fm(messages.errorRequired),
                minLength: { value: 3, message: fm(messages.errorMinLength, { min: 3 }) },
                maxLength: { value: 15, message: fm(messages.errorMaxLength, { max: 15 }) },
                pattern: { value: /^[a-zA-Z0-9]+$/, message: fm(messages.errorPattern) },
              }}
              render={({ field }) => <Input status={errors?.[inputName] && 'error'} {...field} />}
            />
            {errors?.[inputName] && (
              <Typography.Text type="danger">{errors?.[inputName]?.message}</Typography.Text>
            )}
          </Form.Item>
        );
      })}
      <Form.Item>
        <Button htmlType="submit" type="primary">
          {fm(messages.buttonStart)}
        </Button>
      </Form.Item>
    </form>
  );
};

export default GameSetup;
