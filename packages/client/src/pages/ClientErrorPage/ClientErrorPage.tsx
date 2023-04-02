import type { FC } from 'react';
import { Result } from 'antd';
import { Link } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { messages } from './common';

export const ClientErrorPage: FC = () => {
  const { formatMessage: fm } = useIntl();

  return (
    <Result
      status={404}
      title="404"
      subTitle={fm(messages.textErrorMessage)}
      extra={<Link to="/">{fm(messages.buttonText)}</Link>}
    />
  );
};
