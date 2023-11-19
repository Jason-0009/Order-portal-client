import { FC } from 'react'

import { useRouter } from 'next/router'

import { useQuery } from 'react-query'

import { Box, Typography } from '@mui/material'

import withAuth from '@/hoc/withAuth'

import fetchOrderById from '@/api/order/fetchOrderById'

import CenteredLayout from '@/components/layout/CenteredLayout'
import BackButton from '@/components/BackButton'

import Order from '@/types/order/Order.type'

const OrderPage: FC = () => {
    const router = useRouter()
    const { id } = router.query

    const { data: order } = useQuery<Order, Error>(['order', id], () => fetchOrderById(id as string))

    return (
        <CenteredLayout>
            <BackButton href='/orders' />

            <Typography variant="h5" component="h1" fontWeight={600} gutterBottom>
                Ordine <Box component="span" color={'#2EB4FF'}>#{id}</Box>
            </Typography>

            <p>Status: {order?.state}</p>
            <p>Total Price: {order?.totalPrice}</p>
            {/* Add more fields as necessary */}
        </CenteredLayout>
    )
}

export default withAuth(OrderPage)
