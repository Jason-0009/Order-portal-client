import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState: boolean = false

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setIsAuthenticated: (_state, action: PayloadAction<boolean>) => {
            return action.payload
        }
    }
})

export const { setIsAuthenticated } = authSlice.actions

export default authSlice.reducer
