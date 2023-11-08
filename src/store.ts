import { configureStore } from '@reduxjs/toolkit'

import cartReducer from '@/slices/cartSlice'
import orderModalReducer from '@/slices/confirmOrderModalSlice'

export const store = configureStore({
    reducer: {
        cart: cartReducer,
        orderModal: orderModalReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
