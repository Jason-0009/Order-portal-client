import { configureStore } from '@reduxjs/toolkit'

import themeReducer from '@/slices/themeSlice'
<<<<<<< HEAD
=======
import authReducer from '@/slices/authSlice'
>>>>>>> ef4442a7fcd9330fd6d88aff9a36ea616b943c46
import cartReducer from '@/slices/cartSlice'

import alertDialogReducer from '@/slices/dialog/alertDialogSlice'
import confirmationDialogReducer from '@/slices/dialog/confirmationDialogSlice'

import snackbarReducer from '@/slices/snackbarSlice'

export const store = configureStore({
    reducer: {
        theme: themeReducer,
<<<<<<< HEAD
=======
        auth: authReducer,
>>>>>>> ef4442a7fcd9330fd6d88aff9a36ea616b943c46
        cart: cartReducer,
        alertDialog: alertDialogReducer,
        confirmationDialog: confirmationDialogReducer,
        snackbar: snackbarReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
