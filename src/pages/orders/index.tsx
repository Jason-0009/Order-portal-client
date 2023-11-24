import { FC, useState } from 'react'
import { useQuery } from 'react-query'

import { Box, Typography, Divider, Pagination } from '@mui/material'

import { SentimentDissatisfied } from '@mui/icons-material'

import withAuth from '@/hoc/withAuth'

import fetchOrdersByUser from '@/api/order/fetchOrdersByUser'

import CenteredLayout from '@/components/layout/CenteredLayout'
import BackButton from '@/components/BackButton'
import CenteredPaginationBox from '@/components/layout/CenteredPaginationBox'
import OrdersTable from '@/components/order/OrdersTable'

const Orders: FC = () => {
    const [currentPage, setCurrentPage] = useState(1)

    const { data: currentOrders, isLoading } = useQuery(['orders', currentPage],
        () => fetchOrdersByUser(currentPage - 1), { keepPreviousData: true })

    const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => setCurrentPage(value)

    const NoOrders = () => (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 3 }}>
            <SentimentDissatisfied sx={{ fontSize: 40 }} />
            <Typography variant="h6" component="h2" mt={2}>
                Nessun ordine effettuato
            </Typography>
        </Box>
    )

    const OrdersWithPagination = () => (
        <>
            <OrdersTable orders={currentOrders} />

            {Number(currentOrders?.totalPages) > 1 && (
                <CenteredPaginationBox>
                    <Pagination
                        count={currentOrders?.totalPages}
                        page={currentPage}
                        onChange={handlePageChange}
                    />
                </CenteredPaginationBox>
            )}
        </>
    )

    return (
        <CenteredLayout>
            <BackButton href='/' />

            <Typography variant="h5" component="h1" fontWeight={600} gutterBottom>
                Cronologia ordini
            </Typography>

            <Divider />

            {currentOrders?.content.length ? <OrdersWithPagination /> : !isLoading && <NoOrders />}
        </CenteredLayout>
    )
}

export default withAuth(Orders)