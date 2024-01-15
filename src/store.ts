import { configureStore } from '@reduxjs/toolkit'

import cartReducer from '@/slices/cartSlice'
import themeReducer from '@/slices/themeSlice'

import alertDialogReducer from '@/slices/dialog/alertDialogSlice'
import confirmationDialogReducer from '@/slices/dialog/confirmationDialogSlice'

import ordersSnackbarReducer from '@/slices/snackbar/ordersSnackbarSlice'
import usersSnackbarReducer from '@/slices/snackbar/usersSnackbarSlice'

export const store = configureStore({
    reducer: {
        theme: themeReducer,
        cart: cartReducer,
        alertDialog: alertDialogReducer,
        confirmationDialog: confirmationDialogReducer,
        ordersSnackbar: ordersSnackbarReducer,
        usersSnackbar: usersSnackbarReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
