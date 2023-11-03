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

    const currentPageItems = cart.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE)
    const totalPageCount = Math.ceil(cart.length / ITEMS_PER_PAGE)

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            bgcolor: '#F7F7F7',
            height: '100%',
            py: 5
        }}>
            <Typography variant="h6" component="div" sx={{
                textAlign: 'center',
                fontWeight: 600,
                mb: 2
            }}>
                Il mio ordine
            </Typography>

            {currentPageItems.map((item, index) =>
                <CartItem key={index} item={item} />
            )}

            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                my: 2
            }}>
                <Pagination count={totalPageCount} page={page} onChange={(_, value: number) => setPage(value)} />
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => dispatch(openConfirmOrderModal())}
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

            <ConfirmOrderModal />
        </Box >
    )
}

export default Cart
