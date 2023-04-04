import type { FC } from 'react';
import { Form, Select } from 'antd';
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
  getFormValues: () => Record<string, string>;
};

export const InputPlayerColor: FC<InputPlayerColorProps> = ({
  formErrors,
  control,
  index,
  getFormValues,
}) => {
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
          validate: (value) => {
            const formValues = getFormValues();
            const isUniqueColor = Object.values(formValues).filter((v) => v === value).length === 1;

            return isUniqueColor ? true : fm(messages.errorColorsUnique);
          },
        }}
        render={({ field }) => (
          <Select status={formErrors?.[inputName] && 'error'} options={selectOptions} {...field} />
        )}
      />
    </Form.Item>
  );
};
