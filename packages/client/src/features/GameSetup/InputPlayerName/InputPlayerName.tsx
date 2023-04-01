import type { FC } from 'react';
import { Form, Input, Typography } from 'antd';
import type { Control, FieldErrors } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import { useIntl } from 'react-intl';
import { messages } from '../i18n';

type OwnProps = {
  className?: string;
  formErrors: FieldErrors;
  control: Control;
  index: number;
};

type Props = OwnProps;

export const InputPlayerName: FC<Props> = (props) => {
  const { formErrors, control, index } = props;
  const { formatMessage: fm } = useIntl();
  const inputName = `player_name_${index}`;

  return (
    <Form.Item label={fm(messages.playerName, { num: index })} wrapperCol={{ span: 24 }}>
      <Controller
        name={inputName}
        control={control}
        rules={{
          required: fm(messages.errorRequired),
          minLength: { value: 3, message: fm(messages.errorMinLength, { min: 3 }) },
          maxLength: { value: 15, message: fm(messages.errorMaxLength, { max: 15 }) },
          pattern: { value: /^[a-zA-Z0-9]+$/, message: fm(messages.errorPattern) },
        }}
        render={({ field }) => <Input status={formErrors?.[inputName] && 'error'} {...field} />}
      />
      {formErrors?.[inputName] && (
        <Typography.Text type="danger">
          {formErrors?.[inputName]?.message?.toString()}
        </Typography.Text>
      )}
    </Form.Item>
  );
};
