import { FC, useState } from 'react'

import { useSelector, useDispatch } from 'react-redux'

import { Box, Typography, Button, Pagination } from '@mui/material'

import { RootState } from '@/store'

import { openConfirmOrderModal } from '@/slices/confirmOrderModalSlice'

import CartItem from '@/components/cart/CartItem'
import ConfirmOrderModal from '@/components/cart/ConfirmOrderModal'

const ITEMS_PER_PAGE = 3

const Cart: FC = () => {
    const [page, setPage] = useState(1)

    const cart = useSelector((state: RootState) => state.cart)
    const dispatch = useDispatch()

    const totalPageCount = Math.ceil(cart.length / ITEMS_PER_PAGE)

    return (
        <Box sx={{ bgcolor: '#F7F7F7', height: '100vh' }}>
            <Typography variant="h6" component="div" sx={{ textAlign: 'center' }}>
                Il mio ordine
            </Typography>

            {cart.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE).map((item, index) =>
                <CartItem key={index} item={item} />
            )}

            <Button variant="contained" color="primary" onClick={() => dispatch(openConfirmOrderModal())}>
                Conferma l'ordine
            </Button>

            <Pagination count={totalPageCount} page={page} onChange={(_, value: number) => setPage(value)} />

            <ConfirmOrderModal />
        </Box>
    )
}

export default Cart
