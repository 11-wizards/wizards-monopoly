import type { FC } from 'react';
import { Form, Select, Typography } from 'antd';
import type { Control, FieldErrors } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import { useIntl } from 'react-intl';
import { PlayerColors } from 'constants/main';
import { messages } from '../i18n';

type OwnProps = {
  className?: string;
  formErrors: FieldErrors;
  control: Control;
  index: number;
};

type Props = OwnProps;

export const InputPlayerColor: FC<Props> = (props) => {
  const { formErrors, control, index } = props;
  const { formatMessage: fm } = useIntl();
  const selectOptions = [
    { label: 'Red', value: PlayerColors.Red },
    { label: 'Blue', value: PlayerColors.Blue },
    { label: 'Green', value: PlayerColors.Green },
    { label: 'Yellow', value: PlayerColors.Yellow },
  ];
  const inputName = `player_color_${index}`;

  return (
    <Form.Item label={fm(messages.playerColor, { num: index })} wrapperCol={{ span: 24 }}>
      <Controller
        name={inputName}
        control={control}
        rules={{
          required: fm(messages.errorRequired),
        }}
        render={({ field }) => <Select {...field} options={selectOptions} />}
      />
      {formErrors?.[inputName] && (
        <Typography.Text type="danger">
          {formErrors?.[inputName]?.message?.toString()}
        </Typography.Text>
      )}
    </Form.Item>
  );
};
