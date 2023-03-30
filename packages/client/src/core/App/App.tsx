import type { FC } from 'react';
import { useState } from 'react';
import { IntlProvider } from 'react-intl';
import { GlobalOutlined } from '@ant-design/icons';
import { en, ru } from 'translations';
import GameBoard from '../../components/GameBoard/GameBoard';

import './App.scss';
import 'styles/main.scss';

export const App: FC = () => {
  const [locale, setLocale] = useState(navigator.language.slice(0, 2) || 'en');

  const toggleLocale = () => {
    setLocale((prevState) => (prevState === 'en' ? 'ru' : 'en'));
  };

  return (
    <div className="app">
      {/* временное решение до внедрения навбара */}
      <GlobalOutlined className="app__languageToggle" onClick={toggleLocale} />
      <IntlProvider locale={locale} messages={locale === 'en' ? en : ru}>
        {/* <Router /> */}
        <GameBoard />
      </IntlProvider>
    </div>
  );
};
