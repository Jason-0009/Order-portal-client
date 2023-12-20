import { configureStore } from '@reduxjs/toolkit'

import cartReducer from '@/slices/cartSlice'
import alertReducer from '@/slices/alertSlice'

export const store = configureStore({
    reducer: {
        cart: cartReducer,
        alert: alertReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
