import { FC } from 'react'

import { useSelector, useDispatch } from 'react-redux'

import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import {
    Dialog, DialogTitle, DialogContent, DialogContentText,
    DialogActions, Button, Typography
} from '@mui/material'

import { RootState } from '@/store'

import { closeDialog } from '@/slices/dialog/confirmationDialogSlice'
import { clearCart } from '@/slices/cartSlice'

import postOrder from '@/api/order/postOrder'

import ConfirmButton from '../common/button/ConfirmButton'

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
            sx: theme => ({
                backgroundColor: 'secondary.main',
                backgroundImage: 'none',
                pt: 1,
                pb: 3,
                pl: 2,
                pr: 3,
                borderRadius: '20px',
                boxShadow: `0px 0px 14.4px 0px ${theme.palette.secondary.main}`
            })
        }}>
            <DialogTitle sx={{
                fontSize: { xs: '0.85em', sm: '0.9em', md: '1em', lg: '1.1em' },
                fontWeight: 600
            }}>
                {translation('confirmYourOrder')}
            </DialogTitle>

            <DialogContent>
                <DialogContentText sx={{
                    fontSize: { xs: '0.75em', sm: '0.8em', md: '0.85em', lg: '0.9em' },
                }}>
                    {translation('orderTotal')} <Typography component="span" sx={{
                        fontSize: '0.9em',
                        fontWeight: 600
                    }}>
                        €{totalPrice}
                    </Typography>.
                </DialogContentText>
            </DialogContent>

            <DialogActions>
                <Button
                    variant="outlined"
                    size="small"
                    color="inherit"
                    onClick={handleClose}
                    sx={theme => ({
                        borderRadius: '20px',
                        backgroundColor: 'primary.main',
                        textTransform: 'none',
                        fontSize: { xs: '0.6em', sm: '0.7em', md: '0.75em', lg: '0.8em'},
                        width: '30%',
                        height: { xs: '25px', sm: '35px' },
                        border: 'none',
                        boxShadow: `0px 0px 10px 0px ${theme.palette.primary.main}`
                    })}
                >
                    {translation('cancel')}
                </Button>

                <ConfirmButton
                    text={translation('confirm')}
                    size='small'
                    onClick={handleConfirm}
                />
            </DialogActions>
        </Dialog>
    )
}

export default ConfirmationDialog
