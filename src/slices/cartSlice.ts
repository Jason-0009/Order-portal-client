import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState: CartItem[] = []

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<CartItem>) => {
            const index = state.findIndex(item => item.pizza.id === action.payload.pizza.id)

            if (index !== -1) return

            state.push(action.payload)
        },
        removeFromCart: (state, action: PayloadAction<string>) => {
            return state.filter(item => item.pizza.id !== action.payload)
        },
        changeQuantity: (state, action: PayloadAction<{ pizzaId: string; quantity: number }>) => {
            const { pizzaId, quantity } = action.payload
            const item = state.find(item => item.pizza.id === pizzaId)

            if (!item) return

            item.quantity = quantity
        }
    },
})

export const { addToCart, removeFromCart, changeQuantity } = cartSlice.actions

export default cartSlice.reducer
