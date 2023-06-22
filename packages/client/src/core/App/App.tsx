import { type FC, useEffect } from 'react';
import { IntlProvider } from 'react-intl';
import { fetchCurrentUser } from 'app/slices/userSlice';
import { LOCAL_STORAGE_IS_AUTH_KEY } from 'constants/localStorage';
import { Router } from 'core/Router';
import { useAppDispatch } from 'hooks/redux';
import { useLocale } from 'hooks/useLocale';
import { en, ru } from 'translations';
import { Default } from 'layouts';

import 'styles/main.scss';
import './App.scss';

export const App: FC = () => {
  const dispatch = useAppDispatch();
  const [locale] = useLocale();

  useEffect(() => {
    if (localStorage.getItem(LOCAL_STORAGE_IS_AUTH_KEY) === 'true') {
      const fetchUser = async () => {
        await dispatch(fetchCurrentUser());
      };

      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      fetchUser();
    }
  }, [dispatch]);

  return (
    <div className="app">
      <IntlProvider locale={locale} messages={locale === 'en' ? en : ru}>
        <Default />
        <Router />
      </IntlProvider>
    </div>
  );
};
