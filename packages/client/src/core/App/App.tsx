import { type FC, useEffect, useState } from 'react';
import { IntlProvider } from 'react-intl';
import { GlobalOutlined } from '@ant-design/icons';
import { fetchCurrentUser } from 'app/slices/userSlice';
import { LOCAL_STORAGE_IS_AUTH_KEY } from 'constants/localStorage';
import { Router } from 'core/Router';
import { useAppDispatch } from 'hooks/redux';
import { en, ru } from 'translations';

import 'styles/main.scss';
import './App.scss';

export const App: FC = () => {
  const dispatch = useAppDispatch();
  const [locale, setLocale] = useState(navigator.language.slice(0, 2) || 'en');

  const toggleLocale = () => {
    setLocale((prevState) => (prevState === 'en' ? 'ru' : 'en'));
  };

  useEffect(() => {
    if (localStorage.getItem(LOCAL_STORAGE_IS_AUTH_KEY)) {
      const fetchUser = async () => {
        await dispatch(fetchCurrentUser());
      };

      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      fetchUser();
    }
  }, [dispatch]);

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
