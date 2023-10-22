import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isOpen: false
}

const confirmOrderModalSlice = createSlice({
    name: 'confirmOrderModal',
    initialState,
    reducers: {
        openConfirmOrderModal: (state) => {
            state.isOpen = true
        },
        closeConfirmOrderModal: (state) => {
            state.isOpen = false
        },
    },
})

export const { openConfirmOrderModal, closeConfirmOrderModal } = confirmOrderModalSlice.actions

export default confirmOrderModalSlice.reducer
