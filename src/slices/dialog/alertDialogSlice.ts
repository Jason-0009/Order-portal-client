import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type AlertDialogState = {
    isOpen: boolean
    message: string
}

const initialState: AlertDialogState = {
    isOpen: false,
    message: '',
}

const alertDialogSlice = createSlice({
    name: 'alert',
    initialState,
    reducers: {
        showAlert: (state, action: PayloadAction<string>) => {
            state.isOpen = true
            state.message = action.payload
        },
        hideAlert: state => {
            state.isOpen = false
            state.message = ''
        }
    }
})

export const { showAlert, hideAlert } = alertDialogSlice.actions

export default alertDialogSlice.reducer
