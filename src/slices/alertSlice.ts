import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type AlertState = {
    isOpen: boolean
    message: string
}

const initialState: AlertState = {
    isOpen: false,
    message: '',
}

const alertSlice = createSlice({
    name: 'alert',
    initialState,
    reducers: {
        showAlert: (state, action: PayloadAction<string>) => {
            state.isOpen = true
            state.message = action.payload
        },
        hideAlert: (state) => {
            state.isOpen = false
            state.message = ''
        }
    }
})

export const { showAlert, hideAlert } = alertSlice.actions

export default alertSlice.reducer
