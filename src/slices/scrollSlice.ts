import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type ScrollbarState = {
    scrollToCart: boolean
}

const initialState: ScrollbarState = {
    scrollToCart: false
}

const scrollSlice = createSlice({
    name: 'scroll',
    initialState,
    reducers: {
        setScrollToCart: (state, action: PayloadAction<boolean>) => {
            state.scrollToCart = action.payload
        }
    }
})

export const { setScrollToCart } = scrollSlice.actions

export default scrollSlice.reducer
