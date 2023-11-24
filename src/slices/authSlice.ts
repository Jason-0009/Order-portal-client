import { PayloadAction, createSlice } from '@reduxjs/toolkit'

type AuthState = {
    isAuthenticated: boolean
}

const initialState: AuthState = {
    isAuthenticated: false,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuth: (state, action: PayloadAction<boolean>) => { 
            state.isAuthenticated = action.payload 
        }
    }
})

export const { setAuth } = authSlice.actions

export default authSlice.reducer