import type { GameSetupFormData } from 'features/GameSetup/types';
import type { FC } from 'react';
import { Form, Select, Typography } from 'antd';
import type { Control, FieldErrors, UseFormClearErrors, UseFormGetValues } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import { useIntl } from 'react-intl';
import { messages } from 'features/GameSetup/common';
import { selectOptions } from './utils';

type InputPlayerColorProps = {
  className?: string;
  clearErrors: UseFormClearErrors<GameSetupFormData>;
  control: Control;
  formErrors: FieldErrors;
  getFormValues: UseFormGetValues<GameSetupFormData>;
  index: number;
};

export const InputPlayerColor: FC<InputPlayerColorProps> = ({
  formErrors,
  control,
  index,
  getFormValues,
  clearErrors,
}) => {
  const { formatMessage: fm } = useIntl();
  const inputName = `player_color_${index}`;

  return (
    <Form.Item label={fm(messages.playerColor, { num: index + 1 })} wrapperCol={{ span: 24 }}>
      <Controller
        name={inputName}
        control={control}
        shouldUnregister
        rules={{
          required: fm(messages.errorRequired),
          validate: (value) => {
            const formValues = getFormValues();
            const isUniqueColor = Object.values(formValues).filter((v) => v === value).length === 1;

            if (isUniqueColor) {
              const colorErrors = Object.keys(formErrors).filter((e) => e.includes('color'));

              clearErrors(colorErrors);

              return true;
            }

            return fm(messages.errorColorsUnique);
          },
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
