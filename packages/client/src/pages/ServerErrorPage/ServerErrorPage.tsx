import type { FC } from 'react';
import { Result } from 'antd';
import { Link } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { messages } from './common';

export const ServerErrorPage: FC = () => {
  const { formatMessage: fm } = useIntl();

  return (
    <Result
      status={500}
      title="500"
      subTitle={fm(messages.textErrorMessage)}
      extra={<Link to="/">{fm(messages.buttonText)}</Link>}
    />
  );
};
