import { FC } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { useRouter } from 'next/router'

import {
    Dialog, DialogTitle,
    DialogContent, DialogContentText,
    Typography, Button, DialogActions
} from '@mui/material'

import { RootState } from '@/store'

import { closeConfirmOrderModal } from '@/slices/confirmOrderModalSlice'
import { clearCart } from '@/slices/cartSlice'

import postOrder from '@/api/order/postOrder'

import CartItemType from '@/types/CartItem.type'

import OrderState from '@/types/order/OrderState.enum'
import Order from '@/types/order/Order.type'

const createOrder = (cart: CartItemType[], totalPrice: number): Order => ({
    totalPrice,
    state: OrderState.PENDING,
    items: cart.map(item => ({
        pizzaId: item.pizza.id,
        quantity: item.quantity
    }))
})

const ConfirmOrderModal: FC = () => {
    const dispatch = useDispatch()

    const isOpen = useSelector((state: RootState) => state.orderModal.isOpen)
    const cart = useSelector((state: RootState) => state.cart)

    const router = useRouter()

    const totalPrice = cart.reduce((sum, item) => sum + item.pizza.price * item.quantity, 0)

    const handleClose = () => dispatch(closeConfirmOrderModal())

    const handleConfirm = async () => {
        handleClose()

        const order = createOrder(cart, totalPrice)
        const response = await postOrder(order)

        if (response.status !== 200) return

        dispatch(clearCart())

        router.push('/orders')
    }

    return (
        <Dialog open={isOpen} onClose={handleClose} PaperProps={{
            sx: { pt: 1, pb: 3, pl: 2, pr: 3, borderRadius: '15px' }
        }}>
            <DialogTitle sx={{ fontWeight: 600 }}>
                Vuoi confermare il tuo ordine?
            </DialogTitle>

            <DialogContent>
                <DialogContentText sx={{ fontSize: '0.9em' }}>
                    L'ordine andrà ad ammontare a <Typography component="span" sx={{
                        fontSize: '0.9em', fontWeight: 'bold'
                    }}>
                        €{totalPrice}
                    </Typography>.
                </DialogContentText>
            </DialogContent>

            <DialogActions>
                <Button
                    variant="outlined"
                    color="inherit"
                    onClick={handleClose}
                    sx={{ textTransform: 'none ' }}
                >
                    Cancella
                </Button>

                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleConfirm}
                    autoFocus
                    sx={{ textTransform: 'none ' }}
                >
                    Conferma
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default ConfirmOrderModal
