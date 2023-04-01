import type { FC } from 'react';
import { Result } from 'antd';
import { Link } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { ClientErrorPageText } from './common';

export const ClientErrorPage: FC = () => {
  const { formatMessage: fm } = useIntl();

  return (
    <Result
      status={404}
      title='404'
      subTitle={fm(ClientErrorPageText.textErrorMessage)}
      extra={<Link to="/">{fm(ClientErrorPageText.buttonText)}</Link>}
    />
  );
};
