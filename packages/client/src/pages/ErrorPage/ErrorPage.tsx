import type { FC } from 'react';
import { Result } from 'antd';
import { Link } from 'react-router-dom';
import type { ResultStatusType } from 'antd/es/result';

type ErrorPageProps = {
  statusCode?: ResultStatusType;
  title?: string;
  subTitle?: string;
};

const ErrorPage: FC<ErrorPageProps> = ({
  statusCode = '404',
  title = '404',
  subTitle = 'Извините, страница, которую вы посетили, не существует.',
}) => (
  <Result
    status={statusCode}
    title={title}
    subTitle={subTitle}
    extra={<Link to="/">На главную</Link>}
  />
);

export { ErrorPage };
