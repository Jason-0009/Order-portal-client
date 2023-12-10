import { FC, Fragment } from 'react'

import { useRouter } from 'next/router'


import { Box, SxProps, Divider, Pagination, Typography } from '@mui/material'

import withAuth from '@/hoc/withAuth'

import useOrder from '@/hooks/useOrder'

import CenteredLayout from '@/components/layout/CenteredLayout'
import BackButton from '@/components/BackButton'
import OrderStateIndicator from '@/components/order/OrderStateIndicator'
import PizzaItem from '@/components/pizza/PizzaItem'

import { formatDate } from '@/utils/dateUtils'

const OrderPage: FC = () => {
    const router = useRouter()
    const { id } = router.query
    
    const { order, currentPizzas, currentPage, handlePageChange } = useOrder(id as string)
    
    if (!order) return null

    const infoTextStyle: SxProps = { color: '#A5A5A5', fontSize: '0.9em', fontWeight: 600, mb: 1 }
    const valueTextStyle: SxProps = { ...infoTextStyle, color: 'black' }

    const formattedDate = formatDate(order.date as string)

    return (
        <CenteredLayout>
            <BackButton />

            <Typography variant="h5" component="h1" fontWeight={600} mb={3}>
                Ordine <Box component="span" color={'#2EB4FF'}>#{order.id}</Box>
            </Typography>

            <Box
                display="flex"
                justifyContent="space-between"
                width='18%'
                mb={1}
            >
                <Typography sx={infoTextStyle}>Data dell'ordine:</Typography>
                <Typography sx={valueTextStyle}>{formattedDate}</Typography>
            </Box>

            <Box
                display="flex"
                justifyContent="space-between"
                width='14%'
                mb={1}
            >
                <Typography sx={infoTextStyle}>Totale:</Typography>
                <Typography sx={valueTextStyle}>€{order.totalPrice}</Typography>
            </Box>

            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                width='23%'
                mb={4}
            >
                <Typography sx={infoTextStyle}>Stato:</Typography>
                <OrderStateIndicator status={order.status} />
            </Box>

            <Typography variant="h6" component="h1" fontWeight={600} mb={2}>
                Pizze
            </Typography>

            <Divider sx={{ mb: 1 }} />

            {currentPizzas?.content.map((pizza, index) => {
                const orderItem = order.items.find(item => item.id === pizza.id)
                const quantity = orderItem ? orderItem.quantity : 0

                return (
                    <Fragment key={index}>
                        <PizzaItem pizza={pizza} quantity={quantity} />

                        {index < currentPizzas.content.length - 1 && <Divider sx={{ my: 1 }} />}
                    </Fragment>
                )
            })}

            {Number(currentPizzas?.totalPages) > 1 && (
                <Pagination
                    color="primary"
                    count={currentPizzas?.totalPages}
                    page={currentPage}
                    onChange={handlePageChange}
                    sx={{ mt: 2 }}
                />
            )}

        </CenteredLayout>
    )
}

export default withAuth(OrderPage)
