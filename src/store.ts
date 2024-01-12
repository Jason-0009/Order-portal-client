import { configureStore } from '@reduxjs/toolkit'

import themeReducer from '@/slices/themeSlice'
import cartReducer from '@/slices/cartSlice'

import alertDialogReducer from '@/slices/dialog/alertDialogSlice'
import confirmationDialogReducer from '@/slices/dialog/confirmationDialogSlice'

import snackbarReducer from '@/slices/snackbarSlice'

export const store = configureStore({
    reducer: {
        theme: themeReducer,
        cart: cartReducer,
        alertDialog: alertDialogReducer,
        confirmationDialog: confirmationDialogReducer,
        snackbar: snackbarReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
