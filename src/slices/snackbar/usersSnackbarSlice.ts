import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type SnackbarState = {
    open: boolean
    message: string
}

const initialState: SnackbarState = {
    open: false,
    message: '',
}

const usersSnackbarSlice = createSlice({
    name: 'usersSnackbar',
    initialState,
    reducers: {
        showUsersSnackbar: (state, action: PayloadAction<string>) => {
            state.open = true
            state.message = action.payload
        },
        hideUsersSnackbar: (state) => {
            state.open = false
            state.message = ''
        }
    }
})

export const { showUsersSnackbar, hideUsersSnackbar } = usersSnackbarSlice.actions

export default usersSnackbarSlice.reducer
