import { LoginSignupRefreshResponse } from 'types/common';
import { UserData } from 'types/common';

import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

export interface AuthState {
    access: string | null;
    user: UserData | null;
}

const initialState: AuthState = {
    access: null,
    user: null,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (
            state,
            action: PayloadAction<LoginSignupRefreshResponse>,
        ) => {
            state.access = action.payload.access;
        },
        logout: (state) => {
            state.access = null;
        },
    },
});

// Action creators are generated for each case reducer function
export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
export const selectAuth = (state: { auth: AuthState }) => state.auth;
