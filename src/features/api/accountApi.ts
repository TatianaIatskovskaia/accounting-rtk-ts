// import {createAsyncThunk} from "@reduxjs/toolkit";
// import {base_url, createToken} from "../../utils/const.ts";
// import type {UserProfile, UserRegister, UserUpdate} from "../../utils/types.ts";
// import type {RootState} from "../../app/store.ts";

import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {base_url} from "../../utils/const.ts";
import type {UserProfile, UserRegister, UserUpdate} from "../../utils/types";

export const accountApi = createApi({
    reducerPath: 'account',
    baseQuery: fetchBaseQuery({baseUrl: base_url}),
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
            })
        }),
        updateUser: builder.mutation<UserProfile, {user: UserUpdate, login: string, token: string}>({
            query: ({user, login, token}) => ({
                url: `account/user/${login}`,
                method: 'PATCH',
                headers: {
                    Authorization: token
                },
                body: user
            })
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

// export const registerUser = createAsyncThunk(
//     'user/register',
//     async (user: UserRegister) => {
//         const response = await fetch(`${base_url}/account/register`, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(user)
//         });
//         if (response.status === 409) {
//             throw new Error(`User with login ${user.login} already exists`);
//         }
//         if (!response.ok) {
//             throw new Error(`Failed to register user: ${user.login}`);
//         }
//         const data = await response.json();
//         const token = createToken(user.login, user.password);
//         return {
//             token,
//             user: data
//         };
//     }
// )
//
// export const fetchUser = createAsyncThunk(
//     'user/fetch',
//     async (token: string) => {
//         const response = await fetch(`${base_url}/account/login`, {
//             method: 'POST',
//             headers: {
//                 Authorization: token
//             }
//         });
//         if (response.status === 401) {
//             throw new Error(`Invalid credentials`);
//         }
//         if (!response.ok) {
//             throw new Error(`Something went wrong`);
//         }
//         const user = await response.json();
//         return {
//             token,
//             user
//         };
//     }
// )
//
// export const updateUser = createAsyncThunk<UserProfile, UserUpdate, {state: RootState}>(
//     'user/update',
//     async (user, {getState}) => {
//         const response = await fetch(`${base_url}/account/user/${getState().user.login}`, {
//             method: 'PATCH',
//             headers: {
//                 'Content-Type': 'application/json',
//                 Authorization: getState().token
//             },
//             body: JSON.stringify(user)
//         })
//         if (response.status === 401) {
//             throw new Error(`Invalid credentials`);
//         }
//         if (!response.ok) {
//             throw new Error(`Something went wrong`);
//         }
//         return await response.json();
//     }
// )
//
// export const changePassword = createAsyncThunk<string, {newPassword: string, oldPassword: string}, {state: RootState}>(
//     'user/password',
//     async ({newPassword, oldPassword}, {getState}) => {
//         const response = await fetch(`${base_url}/account/password`, {
//             method: 'PATCH',
//             headers: {
//                 'Content-Type': 'application/json',
//                 Authorization: createToken(getState().user.login, oldPassword)
//             },
//             body: JSON.stringify({password: newPassword})
//         })
//         if (response.status === 401) {
//             throw new Error(`Invalid credentials`);
//         }
//         if (!response.ok) {
//             throw new Error(`Something went wrong`);
//         }
//         return createToken(getState().user.login, newPassword);
//     }
// )