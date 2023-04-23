import { useEffect } from 'react';
import { setLocale } from 'app/slices/localeSlice';
import { LOCAL_STORAGE_IS_AUTH_KEY } from 'constants/localStorage';
import { useAppDispatch, useAppSelector } from './redux';

export function useLocale() {
  const dispatch = useAppDispatch();
  const locale = useAppSelector((state) => state.locale);

  useEffect(() => {
    let initialLocale =
      localStorage.getItem(LOCAL_STORAGE_IS_AUTH_KEY) || navigator.language.slice(0, 2);

    const isInitialLocaleSupported = ['en', 'ru'].includes(initialLocale);

    if (!initialLocale || !isInitialLocaleSupported) {
      initialLocale = 'en';
    }

    dispatch(setLocale(initialLocale as LocaleType));
  }, [dispatch]);

  const toggleLocale = () => {
    const nextLocale = locale === 'en' ? 'ru' : 'en';

    localStorage.setItem(LOCAL_STORAGE_IS_AUTH_KEY, nextLocale);
    dispatch(setLocale(nextLocale));
  };

  return [locale, toggleLocale] as const;
}
