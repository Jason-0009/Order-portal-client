import { FC } from 'react'

import { GetServerSideProps } from 'next'
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

const Orders: FC/* <OrdersProps> */ = ({ /* initialOrders */ }) => {
    return <></>
}
    // const { content: orders, totalPages } = initialOrders

    // return (
    //     <Box>
    //         <Link component={NextLink} href="/" color="grey.600">
    //             <IconButton edge="start" color="inherit" aria-label="back" disableRipple>
    //                 <ArrowBackIosIcon />

    //                 <Typography variant="body2">
    //                     Indietro
    //                 </Typography>
    //             </IconButton>
    //         </Link>

    //         <Typography variant="h4" component="h1" gutterBottom>
    //             Cronologia ordini
    //         </Typography>

    //         <Divider />

    //         <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    //             <List>
    //                 {orders.map((order, index) => (
    //                     <ListItem key={index}>
    //                         {/* Render order details */}
    //                         {order.totalPrice}
    //                     </ListItem>
    //                 ))}
    //             </List>
    //             <Pagination count={totalPages} />
    //         </Box>
    //     </Box>

// export const getServerSideProps: GetServerSideProps = async ({ req }) => {
//     const customerId = getCookie('customerId') as string

//     console.log({ customerId })

//     const { data: initialOrders } = await fetchOrdersByCustomerId(customerId)

//     return { props: { initialOrders } }
// }

export default Orders
