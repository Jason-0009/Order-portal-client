import { FC, useState, Fragment } from 'react'

import { useRouter } from 'next/router'

import { useQuery } from 'react-query'

import { Box, SxProps, Divider, Pagination, Typography } from '@mui/material'

import withAuth from '@/hoc/withAuth'

import fetchOrderById from '@/api/order/fetchOrderById'
import fetchPizzas from '@/api/fetchPizzas'

import CenteredLayout from '@/components/layout/CenteredLayout'
import BackButton from '@/components/BackButton'
import OrderStateIndicator from '@/components/order/OrderStateIndicator'
import PizzaItem from '@/components/pizza/PizzaItem'

import Order from '@/types/order/Order.type'
import PagedResponse from '@/types/PagedResponse.type'
import Pizza from '@/types/Pizza.type'
import { formatDate } from '@/utils/dateUtils'

const OrderPage: FC = () => {
    const router = useRouter()
    const { id } = router.query

    const [currentPage, setCurrentPage] = useState(1)

    const { data: order } = useQuery<Order, Error>
        (['order', id], () => fetchOrderById(id as string), { enabled: !!id })

    const pizzaIds = order?.items.map(item => item.pizzaId)

    const { data: pizzas } = useQuery<PagedResponse<Pizza>, Error>
        (['pizzas', currentPage], () => fetchPizzas(currentPage - 1, pizzaIds),
            { enabled: !!order, keepPreviousData: true })

    const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => setCurrentPage(value)

    if (!order) return null

    const infoTextStyle: SxProps = { color: '#A5A5A5', fontSize: '0.9em', fontWeight: 600, mb: 1 }
    const valueTextStyle: SxProps = { ...infoTextStyle, color: 'black' }

    const formattedDate = formatDate(order.date as string)

    return (
        <CenteredLayout>
            <BackButton href='/orders' />

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
                width='12.6%'
                mb={1}
            >
                <Typography sx={infoTextStyle}>Totale:</Typography>
                <Typography sx={valueTextStyle}>€{order.totalPrice}</Typography>
            </Box>

            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                width='22%'
                mb={4}
            >
                <Typography sx={infoTextStyle}>Stato:</Typography>
                <OrderStateIndicator state={order.state} />
            </Box>

            <Typography variant="h6" component="h1" fontWeight={600} mb={2}>
                Pizze
            </Typography>

            <Divider sx={{ mb: 1 }} />

            {pizzas?.content.map((pizza, index) => {
                const orderItem = order?.items.find(item => item.pizzaId === pizza.id)
                const quantity = orderItem ? orderItem.quantity : 0

                return (
                    <Fragment key={index}>
                        <PizzaItem pizza={pizza} quantity={quantity} />

                        {index < pizzas.content.length - 1 && <Divider sx={{ my: 1 }} />}
                    </Fragment>
                )
            })}

            {Number(pizzas?.totalPages) > 1 && (
                <Pagination
                    color="primary"
                    count={pizzas?.totalPages}
                    page={currentPage}
                    onChange={handlePageChange}
                    sx={{ mt: 2 }}
                />
            )}

        </CenteredLayout>
    )
}

export default withAuth(OrderPage)
