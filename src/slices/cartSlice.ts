import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import CartItemType from '@/types/CartItem.type'

const initialState: CartItemType[] = []

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<CartItemType>) => {
            const index = state.findIndex(item => item.product.id === action.payload.product.id)

            if (index !== -1) return

            state.push(action.payload)
        },
        removeFromCart: (state, action: PayloadAction<string>) => state.filter(item => item.product.id !== action.payload),
        changeQuantity: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
            const { id, quantity } = action.payload
            const item = state.find(item => item.product.id === id)

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
