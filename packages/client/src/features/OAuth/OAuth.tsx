import { OAUTH_REDIRECT_URI } from 'constants/main';
import type { FC } from 'react';
import { useIntl } from 'react-intl';
import { useGetServiceIdQuery } from 'api/oauth.api';
import { ReactComponent as YandexLogo } from 'assets/icons/Yandex_icon.svg';
import { getOauthRedirectUri, messages } from './common';

import './OAuth.scss';

type OAuthProps = {
  className?: string;
};

export const OAuth: FC<OAuthProps> = ({ className }) => {
  const { formatMessage: fm } = useIntl();
  const { data, isLoading } = useGetServiceIdQuery({ redirectUri: OAUTH_REDIRECT_URI });

  const handleOauthClick = () => {
    document.location.href = getOauthRedirectUri(data!.serviceId);
  };

  return (
    <button
      className={`oauth__button ${className ?? ''}`}
      type="button"
      onClick={handleOauthClick}
      disabled={isLoading || !data?.serviceId}
    >
      <YandexLogo />
      {fm(messages.buttonOAuthLabel)}
    </button>
  );
};
