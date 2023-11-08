import { FC } from 'react'

import NextLink from 'next/link'

import {
    Box, Link, IconButton,
    Typography, Divider, List,
    ListItem, Pagination
} from '@mui/material'

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'

import Order from '@/types/order/Order.type'

type OrdersProps = {
    initialOrders: PagedResponse<Order>
}

const Orders: FC<OrdersProps> = () => {
    const orders = ['1', '2', '3']
    const totalPages = 2

    return (
        <>
            <Link component={NextLink} href="/" color="grey.600">
                <IconButton edge="start" color="inherit" aria-label="back" disableRipple>
                    <ArrowBackIosIcon />

                    <Typography variant="body2">
                        Indietro
                    </Typography>
                </IconButton>
            </Link>

            <Typography variant="h4" component="h1" gutterBottom>
                Cronologia ordini
            </Typography>

            <Divider />

            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <List>
                    {orders.map((order, index) => (
                        <ListItem key={index}>
                            {/* Render order details */}
                            {order}
                        </ListItem>
                    ))}
                </List>

                <Pagination count={totalPages} />
            </Box>
        </>
    )
}

export default Orders
