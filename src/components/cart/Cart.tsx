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
import PaginationComponent from '../common/PaginationComponent'

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
        if (!scrollToCart || !cartRef.current) return

        const element = cartRef.current
        const offset = window.innerHeight / 2 - element.getBoundingClientRect().height / 2

        setTimeout(() => {
            window.scrollTo({
                top: element.getBoundingClientRect().top + window.scrollY - offset,
                behavior: 'smooth'
            })

            dispatch(setScrollToCart(false))

            setCurrentPage(totalPageCount)
        }, 200)
    }, [scrollToCart, dispatch, totalPageCount])


    const handleClick = () => dispatch(openDialog())

    return (
        <Box ref={cartRef} sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            backgroundColor: 'secondary.main',
            height: '100%',
            borderRadius: { xs: '20px', lg: 'unset' },
            mx: { xs: 6, lg: 0 },
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

            {totalPageCount > 1 &&
                <PaginationComponent
                    count={totalPageCount}
                    page={currentPage}
                    onChange={handlePageChange}
                    color='primary'
                    sx={{ mt: 0, mb: 2 }}
                />
            }

            <Box sx={{ mt: 1 }}>
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
