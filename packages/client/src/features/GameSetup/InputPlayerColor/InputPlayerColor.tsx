import type { FC } from 'react';
import { Form, Select, Typography } from 'antd';
import type { Control, FieldErrors } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import { useIntl } from 'react-intl';
import { messages } from 'features/GameSetup/common';
import { selectOptions } from './utils';

type InputPlayerColorProps = {
  className?: string;
  control: Control;
  formErrors: FieldErrors;
  index: number;
};

export const InputPlayerColor: FC<InputPlayerColorProps> = ({ formErrors, control, index }) => {
  const { formatMessage: fm } = useIntl();
  const inputName = `player_color_${index}`;

  return (
    <Form.Item label={fm(messages.playerColor, { num: index })} wrapperCol={{ span: 24 }}>
      <Controller
        name={inputName}
        control={control}
        shouldUnregister
        rules={{
          required: fm(messages.errorRequired),
        }}
        render={({ field }) => (
          <Select status={formErrors?.[inputName] && 'error'} options={selectOptions} {...field} />
        )}
      />
      {formErrors?.[inputName] && (
        <Typography.Text type="danger">
          {formErrors?.[inputName]?.message?.toString()}
        </Typography.Text>
      )}
    </Form.Item>
  );
};
