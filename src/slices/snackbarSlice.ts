import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type SnackbarState = {
    open: boolean
    message: string
}

const initialState: SnackbarState = {
    open: false,
    message: '',
}

const snackbarSlice = createSlice({
    name: 'snackbar',
    initialState,
    reducers: {
        showSnackbar: (state, action: PayloadAction<string>) => {
            state.open = true
            state.message = action.payload
        },
        hideSnackbar: (state) => {
            state.open = false
            state.message = ''
        }
    }
})

export const { showSnackbar, hideSnackbar } = snackbarSlice.actions

export default snackbarSlice.reducer
