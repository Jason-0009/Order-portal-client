import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import CartItemType from '@/types/CartItem.type'

const initialState: CartItemType[] = []

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<CartItemType>) => {
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
        },
        clearCart: () => {
            return initialState
        }
    },
})

export const { addToCart, removeFromCart, changeQuantity, clearCart } = cartSlice.actions

export default cartSlice.reducer
