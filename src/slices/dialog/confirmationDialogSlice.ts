import { createSlice } from '@reduxjs/toolkit'

type ConfirmationDialogState = {
    isOpen: boolean
}

const initialState: ConfirmationDialogState = {
    isOpen: false
}

export const confirmationDialogSlice = createSlice({
    name: 'confirmationDialog',
    initialState,
    reducers: {
        openDialog: state => {
            state.isOpen = true
        },
        closeDialog: state => {
            state.isOpen = false
        }
    }
})

export const { openDialog, closeDialog } = confirmationDialogSlice.actions

export default confirmationDialogSlice.reducer
