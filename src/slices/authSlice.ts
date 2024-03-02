import { createSlice } from '@reduxjs/toolkit'

type AuthState = {
    isAuthenticated: boolean
}

const initialState: AuthState = {
    isAuthenticated: false
}

const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        setAuthenticated(state, action) {
            state.isAuthenticated = action.payload
        }
    }
})

export const { setAuthenticated } = authSlice.actions

export default authSlice.reducer
