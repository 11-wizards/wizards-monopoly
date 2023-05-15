import { baseApi } from 'api/base.api';
import { convertStringToServerError } from 'helpers/convertStringToServerError';
import type {
  OAuthServicePayload,
  OAuthServiceDto,
  OauthSignInPayload,
  OAuthServiceNormalize,
} from 'models/auth.model';

export const oAuthApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getServiceId: builder.query<OAuthServiceNormalize, OAuthServicePayload>({
      query: ({ redirectUri }) => ({
        url: '/oauth/yandex/service-id',
        params: {
          redirect_uri: redirectUri,
        },
      }),
      transformResponse: (response: OAuthServiceDto) => ({ serviceId: response.service_id }),
    }),
    signInWithYandex: builder.mutation<Response, OauthSignInPayload>({
      query: ({ code, redirectUri }: OauthSignInPayload) => ({
        url: '/oauth/yandex',
        method: 'POST',
        body: {
          code,
          redirect_uri: redirectUri,
        },
      }),
      transformErrorResponse: () =>
        convertStringToServerError("Couldn't log in via OAuth, try again later."),
    }),
  }),
});

export const { useGetServiceIdQuery, useSignInWithYandexMutation } = oAuthApi;
