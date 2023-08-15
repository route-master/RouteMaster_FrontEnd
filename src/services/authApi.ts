import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://auth.route-master.org/v1',
    mode: 'cors',
    prepareHeaders: (headers, { getState }) => {
      headers.set('Access-Control-Allow-Origin', '*');
      return headers;
    },
  }),
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (body: { username: string; password: string }) => {
        return {
          url: '/user/email/login',
          method: 'PATCH',
          body,
        };
      },
    }),
    registerUser: builder.mutation({
      query: (body: {
        username: string;
        password: string;
        authorities: string;
      }) => {
        return {
          url: '/user/email/register',
          method: 'POST',
          body,
        };
      },
    }),
  }),
});

export const { useLoginUserMutation, useRegisterUserMutation } = authApi;
