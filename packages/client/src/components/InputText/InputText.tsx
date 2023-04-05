import { Input, Typography } from 'antd';
import type { FC } from 'react';
import { Controller, type Control, type ValidationRule } from 'react-hook-form';

type InputTextProps = {
  name: string;
  control: Control;
  className?: string;
  rules?: { [key: string]: ValidationRule };
  label?: string;
  placeholder?: string;
  errorMessage?: string;
};

export const InputText: FC<InputTextProps> = ({
  name,
  control,
  className,
  rules,
  label,
  placeholder,
  errorMessage,
}) => (
  <div className={className}>
    {label && <label htmlFor={name}>{label}</label>}
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field }) => (
        <Input placeholder={placeholder} status={errorMessage && 'error'} {...field} />
      )}
    />
    {errorMessage && (
      <Typography.Text className={className ? `${className}Error` : ''}>
        {errorMessage}
      </Typography.Text>
    )}
  </div>
);
