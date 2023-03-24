import { FC, useState } from 'react';
import { IntlProvider } from 'react-intl';
import { GlobalOutlined } from '@ant-design/icons';
import { Router } from 'core/Router';
import { en, ru } from 'translations';

import './App.scss';

export const App: FC = () => {
  const [locale, setLocale] = useState<LocaleType>(
    (navigator.language.slice(0, 2) || 'en') as LocaleType
  );

  const toggleLocale = () => {
    setLocale((prevState) => (prevState === 'en' ? 'ru' : 'en'));
  };

  return (
    <div className="app">
      {/* временное решение до внедрения навбара */}
      <GlobalOutlined className="app__languageToggle" onClick={toggleLocale} />
      <IntlProvider locale={locale} messages={locale === 'en' ? en : ru}>
        <Router />
      </IntlProvider>
    </div>
  );
};
