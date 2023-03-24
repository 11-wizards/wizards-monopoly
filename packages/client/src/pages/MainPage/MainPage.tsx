import { FC } from 'react';
import { defineMessages, useIntl } from 'react-intl';

import './MainPage.scss';

const messages = defineMessages({
  pageTitle: { id: 'main-page.title', defaultMessage: 'Main' },
});

export const MainPage: FC = () => {
  const { formatMessage: fm } = useIntl();

  return (
    <div className="wrapper_mainPage">
      <div>{fm(messages.pageTitle)}</div>
    </div>
  );
};
