import { FC, useEffect, useState, ChangeEvent } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { useTranslation } from 'next-i18next'

import { Box, Typography, Button, Pagination } from '@mui/material'

import { RootState } from '@/store'

import { openDialog } from '@/slices/confirmationDialogSlice'

import CartItem from './CartItem'
import ConfirmationDialog from '../dialog/ConfirmationDialog'

const ITEMS_PER_PAGE = 3

const Cart: FC = () => {
    const [currentPage, setCurrentPage] = useState(1)

    const cart = useSelector((state: RootState) => state.cart)

    const dispatch = useDispatch()

    const { t: translation } = useTranslation()

    const currentPageItems = cart.slice((currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE)
    const totalPageCount = Math.ceil(cart.length / ITEMS_PER_PAGE)

    const handlePageChange = (_: ChangeEvent<unknown>, page: number) => setCurrentPage(page)

    useEffect(() => {
        if (currentPageItems.length !== 0) return

        setCurrentPage(currentPage - 1)
    }, [currentPageItems])

    const handleClick = () => dispatch(openDialog())

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
                {translation('myOrder')}
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
                    onClick={handleClick}
                    sx={{
                        textTransform: 'none',
                        width: '90%',
                        fontWeight: 600,
                        p: 2
                    }}
                >
                    {translation('confirmOrder')}
                </Button>
            </Box>

            <ConfirmationDialog />
        </Box >
    )
}

export default Cart
