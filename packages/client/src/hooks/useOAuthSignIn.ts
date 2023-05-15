import { useSignInWithYandexMutation } from 'api/oauth.api';
import { fetchCurrentUser } from 'app/slices/userSlice';
import { handleServerError } from 'helpers/handleServerError';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const useOAuthSignIn = () => {
  const [signIn] = useSignInWithYandexMutation();
  const location = useLocation();

  useEffect(() => {
    if (location.search) {
      const params = new URLSearchParams(location.search);
      const code = params.get('code');

      if (code) {
        signIn({ code })
          .unwrap()
          .then((res) => {
            if (res.ok) {
              fetchCurrentUser();
            }
          })
          .catch((e: ServerError) => handleServerError(e));
      }
    }
  }, [location, signIn]);
};
