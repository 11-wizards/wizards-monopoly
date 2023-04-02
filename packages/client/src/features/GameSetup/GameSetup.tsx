import type { FC } from 'react';
import { useState } from 'react';
import { Button, Col, Form, InputNumber, Row, Typography } from 'antd';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setNumberOfPlayers, setPlayers } from 'app/slices/gameSlice';
import { useForm } from 'react-hook-form';
import { MAX_NUMBER_OF_PLAYERS, MIN_NUMBER_OF_PLAYERS } from 'constants/main';
import { ROUTES } from 'core/Router';
import { messages } from './i18n';
import { InputPlayerName } from './InputPlayerName';
import { InputPlayerColor } from './InputPlayerColor';
import type { GameSetupFormData } from './types';
import { checkUniquenessColors, createPlayersArray } from './utils';

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

  const submitHandler = () => {
    const formData = getValues();
    const formHasErrors = !checkUniquenessColors(formData);

    if (formHasErrors) {
      setError('form', { message: fm(messages.errorColorsUnique) });
      return;
    }

    clearErrors('form');

    dispatch(setNumberOfPlayers(playersCount.length));
    dispatch(setPlayers(formData));
    reset();
    navigate(ROUTES.GAME_PAGE.path);
  };

  return (
    <Form layout="vertical" onSubmitCapture={handleSubmit(submitHandler, submitHandler)}>
      <Form.Item wrapperCol={{ span: 16 }} label={fm(messages.textChoose)}>
        <InputNumber
          defaultValue={playersCount.length}
          min={MIN_NUMBER_OF_PLAYERS}
          max={MAX_NUMBER_OF_PLAYERS}
          onChange={handlePlayersChange}
        />
      </Form.Item>
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
    </Form>
  );
};
