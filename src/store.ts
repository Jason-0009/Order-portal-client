import { configureStore } from '@reduxjs/toolkit'

import authReducer from '@/slices/authSlice'
import userProfileReducer from '@/slices/userProfileSlice'
import cartReducer from '@/slices/cartSlice'
import orderModalReducer from '@/slices/confirmOrderModalSlice'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        userProfile: userProfileReducer,
        cart: cartReducer,
        orderModal: orderModalReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
