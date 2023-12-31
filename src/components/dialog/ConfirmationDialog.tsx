import { FC } from 'react'

import { useSelector, useDispatch } from 'react-redux'

import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import {
    Dialog, DialogTitle, DialogContent, DialogContentText,
    DialogActions, Button, Typography
} from '@mui/material'

import { RootState } from '@/store'

import { closeDialog } from '@/slices/confirmationDialogSlice'
import { clearCart } from '@/slices/cartSlice'

import postOrder from '@/api/order/postOrder'

import CartItemType from '@/types/CartItem.type'
import OrderStatus from '@/types/order/OrderStatus.enum'
import Order from '@/types/order/Order.type'

const createOrder = (cart: CartItemType[], totalPrice: number): Order => ({
    totalPrice,
    status: OrderStatus.PENDING,
    items: cart.map(item => ({
        id: item.product.id,
        quantity: item.quantity
    }))
})

const ConfirmationDialog: FC = () => {
    const isOpen = useSelector((state: RootState) => state.confirmationDialog.isOpen)
    const cart = useSelector((state: RootState) => state.cart)

    const dispatch = useDispatch()

    const router = useRouter()

    const { t: translation } = useTranslation()

    const totalPrice = cart.reduce((sum, item) =>
        sum + item.product.price * item.quantity, 0)

    const handleClose = () => dispatch(closeDialog())

    const handleConfirm = async () => {
        handleClose()

        const order = createOrder(cart, totalPrice)

        await postOrder(order)

        dispatch(clearCart())

        router.push('/orders')
    }

    return (
        <Dialog open={isOpen} onClose={handleClose} PaperProps={{
            sx: { pt: 1, pb: 3, pl: 2, pr: 3, borderRadius: '15px' }
        }}>
            <DialogTitle sx={{ fontWeight: 600 }}>
                {translation('confirmYourOrder')}
            </DialogTitle>

            <DialogContent>
                <DialogContentText sx={{ fontSize: '0.9em' }}>
                    {translation('orderTotal')}

                    <Typography component="span" sx={{
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
                    {translation('cancel')}
                </Button>

                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleConfirm}
                    autoFocus
                    sx={{ textTransform: 'none ' }}
                >
                    {translation('confirm')}
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default ConfirmationDialog
