import { OAUTH_REDIRECT_URI } from 'constants/main';

export const messages = {
  buttonOauthLabel: { id: 'auth.button.oauth', defaultMessage: 'Login with Yandex' },
};

export const getOauthRedirectUri = (clientId: string, redirectUri: string = OAUTH_REDIRECT_URI) =>
  `https://oauth.yandex.ru/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}`;
