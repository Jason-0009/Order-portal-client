import { FC, useEffect, useState, ChangeEvent } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { useRouter } from 'next/router'

import {
    Box, Typography, Button, Pagination,
    Dialog, DialogTitle, DialogContent,
    DialogContentText, DialogActions
} from '@mui/material'

import { RootState } from '@/store'

import { clearCart } from '@/slices/cartSlice'

import postOrder from '@/api/order/postOrder'

import CartItem from './CartItem'

import OrderStatus from '@/types/order/OrderStatus.enum'
import CartItemType from '@/types/CartItem.type'
import Order from '@/types/order/Order.type'

const ITEMS_PER_PAGE = 3

const createOrder = (cart: CartItemType[], totalPrice: number): Order => ({
    totalPrice,
    status: OrderStatus.PENDING,
    items: cart.map(item => ({
        id: item.product.id,
        quantity: item.quantity
    }))
})

const Cart: FC = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [isConfirmationDialogOpen, setIsConfirmationDialogOpen] = useState(false)

    const cart = useSelector((state: RootState) => state.cart)
    const dispatch = useDispatch()
    const router = useRouter()

    const totalPrice = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
    const currentPageItems = cart.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)
    const totalPageCount = Math.ceil(cart.length / ITEMS_PER_PAGE)

    const handlePageChange = (_: ChangeEvent<unknown>, page: number) => setCurrentPage(page)

    useEffect(() => {
        if (currentPageItems.length !== 0) return

        setCurrentPage(currentPage - 1)
    }, [currentPageItems])

    const handleClose = () => setIsConfirmationDialogOpen(false)

    const handleConfirm = async () => {
        handleClose()

        const order = createOrder(cart, totalPrice)

        await postOrder(order)

        dispatch(clearCart())

        router.push('/orders')
    }

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            backgroundColor: '#F7F7F7',
            height: '100%',
        }}>
            <Typography variant="h6" sx={{
                textAlign: 'center',
                fontWeight: 600,
                mb: 2
            }}>
                Il mio ordine
            </Typography>

            {currentPageItems.map(item =>
                <CartItem key={item.product.id} item={item} />
            )}

            {totalPageCount > 1 && (
                <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
                    <Pagination
                        count={totalPageCount}
                        page={currentPage}
                        onChange={handlePageChange}
                    />
                </Box>
            )}

            <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => setIsConfirmationDialogOpen(true)}
                    sx={{
                        textTransform: 'none',
                        width: '90%',
                        fontWeight: 600,
                        p: 2
                    }}
                >
                    Conferma l'ordine
                </Button>
            </Box>

            <Dialog open={isConfirmationDialogOpen} onClose={handleClose} PaperProps={{
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
        </Box >
    )
}

export default Cart
