import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {base_url} from "../../utils/const.ts";
import type {UserProfile, UserRegister, UserUpdate} from "../../utils/types";
import type {RootState} from "../../app/store.ts";

const authEndpoints = ['updateUser'];

export const accountApi = createApi({
    reducerPath: 'account',
    baseQuery: fetchBaseQuery({
        baseUrl: base_url,
        prepareHeaders: (headers, {getState, endpoint}) => {
            if (authEndpoints.includes(endpoint)) {
                const token = (getState() as RootState).token;
                headers.set('Authorization', token);
            }
            return headers;
        }
    }),
    tagTypes: ['User'],
    endpoints: builder => ({
        registerUser: builder.mutation<UserProfile, UserRegister>({
            query: (user) => ({
                url: '/account/register',
                method: 'POST',
                body: user
            })
        }),
        fetchUser: builder.query<UserProfile, string>({
            query: (token) => ({
                url: `/account/login`,
                method: 'POST',
                headers: {
                    Authorization: token
                }
            }),
            providesTags: ['User']
        }),
        updateUser: builder.mutation<UserProfile, {user: UserUpdate, login: string}>({
            query: ({user, login}) => ({
                url: `account/user/${login}`,
                method: 'PATCH',
                body: user
            }),
            invalidatesTags: ['User']
        }),
        changePassword: builder.mutation<void, {newPassword: string, token: string}>({
            query: ({newPassword, token}) => ({
                url: `/account/password`,
                method: 'PATCH',
                headers: {
                    Authorization: token
                },
                body: {password: newPassword}
            })
        })
    })
})

export const {useRegisterUserMutation, useFetchUserQuery, useLazyFetchUserQuery, useUpdateUserMutation, useChangePasswordMutation} = accountApi;
