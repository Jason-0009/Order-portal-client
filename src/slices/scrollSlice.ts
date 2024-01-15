import { createSlice } from '@reduxjs/toolkit'

const scrollSlice = createSlice({
    name: 'scroll',
    initialState: { scrollToCart: false },
    reducers: {
        setScrollToCart: (state, action) => {
            state.scrollToCart = action.payload
        }
    }
})

export const { setScrollToCart } = scrollSlice.actions

export default scrollSlice.reducer
