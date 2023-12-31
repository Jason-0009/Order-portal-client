import { configureStore } from '@reduxjs/toolkit'

import themeReducer from '@/slices/themeSlice'
import cartReducer from '@/slices/cartSlice'
import alertDialogReducer from '@/slices/alertDialogSlice'
import confirmationDialogReducer from '@/slices/confirmationDialogSlice'

export const store = configureStore({
    reducer: {
        theme: themeReducer,
        cart: cartReducer,
        alertDialog: alertDialogReducer,
        confirmationDialog: confirmationDialogReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
