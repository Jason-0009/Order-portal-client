import { ChangeEvent, FC, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { useTranslation } from 'next-i18next'

import { Box, Divider, Pagination, Typography } from '@mui/material'

import { RootState } from '@/store'

import { openDialog } from '@/slices/dialog/confirmationDialogSlice'
import { setScrollToCart } from '@/slices/scrollSlice'

import ConfirmButton from '../common/button/ConfirmButton'

import CartItem from './CartItem'

import ConfirmationDialog from '../dialog/ConfirmationDialog'

const ITEMS_PER_PAGE = 3

const Cart: FC = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const cartRef = useRef<HTMLElement | null>(null)

    const cart = useSelector((state: RootState) => state.cart)
    const { scrollToCart } = useSelector((state: RootState) => state.scroll)

    const dispatch = useDispatch()
    const { t: translation } = useTranslation()

    const currentPageItems = cart.slice((currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE)
    const totalPageCount = Math.ceil(cart.length / ITEMS_PER_PAGE)

    const handlePageChange = (_: ChangeEvent<unknown>, page: number) => setCurrentPage(page)

    useEffect(() => {
        if (currentPageItems.length !== 0) return

        setCurrentPage(currentPage - 1)
    }, [currentPageItems, currentPage])

    useEffect(() => {
        if (!scrollToCart) return

        const element = cartRef.current

        if (!element) return

        const offset = window.innerHeight / 2 - element.getBoundingClientRect().height / 2
        
        window.scrollTo({ top: element.getBoundingClientRect().top + window.scrollY - offset, behavior: 'smooth' })
        
        dispatch(setScrollToCart(false))

        setCurrentPage(totalPageCount)
    }, [scrollToCart, dispatch])

    const handleClick = () => dispatch(openDialog())

    return (
        <Box ref={cartRef} sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            backgroundColor: 'secondary.main',
            height: '100%',
            p: 3
        }}>
            <Typography variant="h6" sx={{
                fontWeight: 600,
                mb: 3,
                fontSize: { xs: '0.9rem', sm: '1.25rem' }
            }}>
                {translation('myOrder')}
            </Typography>

            <Divider sx={{ mb: 3 }} />

            {currentPageItems.map(item =>
                <CartItem key={item.product.id} item={item} />
            )}

            {totalPageCount > 1 && (
                <Box sx={{
                    display: 'flex',
                    justifyContent: { sm: 'start', md: 'center' }
                }}>
                    <Pagination
                        count={totalPageCount}
                        page={currentPage}
                        onChange={handlePageChange}
                        sx={{
                            '& .MuiPaginationItem-root': {
                                fontSize: { xs: '0.7em', sm: '0.8em' }
                            },
                            mb: 3
                        }}
                    />
                </Box>
            )}

            <Box sx={{
                display: 'flex',
                justifyContent: 'center'
            }}>
                <ConfirmButton
                    text={translation('confirmOrder')}
                    size='large'
                    onClick={handleClick}
                />
            </Box>

            <ConfirmationDialog />
        </Box >
    )
}

export default Cart
