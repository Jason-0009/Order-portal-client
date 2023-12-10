import { configureStore } from '@reduxjs/toolkit'

import authReducer from '@/slices/authSlice'
import userProfileReducer from '@/slices/userProfileSlice'
import cartReducer from '@/slices/cartSlice'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        userProfile: userProfileReducer,
        cart: cartReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
