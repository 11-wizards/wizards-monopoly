import type { FC } from 'react';
import { useState } from 'react';
import { Button, Col, Form, InputNumber, Row, Typography } from 'antd';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setNumberOfPlayers, setPlayers } from 'app/slices/gameSlice';
import { useForm } from 'react-hook-form';
import { MAX_NUMBER_OF_PLAYERS, MIN_NUMBER_OF_PLAYERS } from 'constants/main';
import { messages } from './i18n';
import { ROUTES } from '../../core/Router';
import { InputPlayerName } from './InputPlayerName';
import { InputPlayerColor } from './InputPlayerColor';
import type { GameSetupFormData } from './types';

const createPlayersArray = (length: Nullable<number>) =>
  Array.from({ length: length || 0 }).map((_, i) => ({
    id: `${i}-player`,
  }));

const isUniquenessColors = (colors: string[]) => {
  const colorsSet = new Set(colors);

  return colorsSet.size === colors.length;
};

export const GameSetup: FC = () => {
  const [playersCount, setPlayersCount] = useState(createPlayersArray(2));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { formatMessage: fm } = useIntl();
  const {
    handleSubmit,
    formState: { errors },
    reset,
    control,
    getValues,
    setError,
    clearErrors,
  } = useForm<GameSetupFormData>({
    mode: 'onBlur',
  });

  const handlePlayersChange = (number: Nullable<number>) => {
    if (!number) {
      return;
    }

    setPlayersCount(createPlayersArray(number));
  };

  const checkUniquenessColors = (data: GameSetupFormData) => {
    const colors = Object.entries(data)
      .filter(([key]) => key.includes('color'))
      .map(([_, value]) => value);

    const isUniqueness = isUniquenessColors(colors);

    isUniqueness
      ? clearErrors('form')
      : setError('form', { message: fm(messages.errorColorsUnique) });

    return isUniqueness;
  };

  const submitHandler = () => {
    const formData = getValues();

    if (!checkUniquenessColors(formData)) {
      return;
    }

    dispatch(setNumberOfPlayers(playersCount.length));
    dispatch(setPlayers(formData));
    reset();
    navigate(ROUTES.GAME_PAGE.path);
  };

  return (
    <form onSubmit={handleSubmit(submitHandler, submitHandler)}>
      <Row wrap={false}>
        <Col>
          <Form.Item wrapperCol={{ span: 16 }} label={fm(messages.textChoose)}>
            <InputNumber
              defaultValue={playersCount.length}
              min={MIN_NUMBER_OF_PLAYERS}
              max={MAX_NUMBER_OF_PLAYERS}
              onChange={handlePlayersChange}
            />
          </Form.Item>
        </Col>
      </Row>
      {playersCount.map(({ id }, i) => (
        <Row key={`${id}-row`} gutter={16} wrap={false}>
          <Col span={12}>
            <InputPlayerName formErrors={errors} control={control} index={i + 1} />
          </Col>
          <Col span={12}>
            <InputPlayerColor formErrors={errors} control={control} index={i + 1} />
          </Col>
        </Row>
      ))}
      {errors?.form && (
        <Typography.Paragraph type="danger">
          {errors?.form?.message?.toString()}
        </Typography.Paragraph>
      )}
      <Form.Item>
        <Button htmlType="submit" type="primary">
          {fm(messages.buttonStart)}
        </Button>
      </Form.Item>
    </form>
  );
};
