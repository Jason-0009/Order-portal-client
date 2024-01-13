import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type SnackbarState = {
    open: boolean
    message: string
}

const initialState: SnackbarState = {
    open: false,
    message: '',
}

const ordersSnackbarSlice = createSlice({
    name: 'ordersSnackbar',
    initialState,
    reducers: {
        showOrdersSnackbar: (state, action: PayloadAction<string>) => {
            state.open = true
            state.message = action.payload
        },
        hideOrdersSnackbar: (state) => {
            state.open = false
            state.message = ''
        }
    }
})

export const { showOrdersSnackbar, hideOrdersSnackbar } = ordersSnackbarSlice.actions

export default ordersSnackbarSlice.reducer
