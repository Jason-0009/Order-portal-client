import { FC, useState } from 'react'

import { useQuery } from 'react-query'

import { Typography, Divider, Pagination, Box } from '@mui/material'

import withAuth from '@/hoc/withAuth'

import fetchOrdersByUser from '@/api/order/fetchOrdersByUser'

import CenteredLayout from '@/components/layout/CenteredLayout'
import CenteredBox from '@/components/layout/CenteredBox'

import BackButton from '@/components/BackButton'

import OrdersFilter from '@/components/order/OrdersFilter'
import OrdersTable from '@/components/order/OrdersTable'
import NoOrdersFound from '@/components/order/NoOrdersFound'

import OrderStatus from '@/types/order/OrderStatus.enum'
import useOrders from '@/hooks/useOrders'

const OrdersPage: FC = () => {
    const {
        currentOrders,
        isLoading,
        currentPage,
        setCurrentPage,
        filteredDate,
        setFilteredDate,
        filteredStatus,
        setFilteredStatus,
    } = useOrders()
    
    const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => setCurrentPage(value)

    return (
        <CenteredLayout>
            <BackButton />

            <Typography variant="h5" component="h1" fontWeight={600} gutterBottom>
                Cronologia ordini
            </Typography>

            <Divider sx={{ mb: 3 }} />

            <OrdersFilter
                filteredDate={filteredDate}
                setFilteredDate={setFilteredDate}
                filteredStatus={filteredStatus}
                setFilteredStatus={setFilteredStatus}
            />

            {currentOrders && currentOrders.content.length > 0 ? (
                <Box>
                    {currentOrders && <OrdersTable orders={currentOrders.content} />}

                    {Number(currentOrders?.totalPages) > 1 && (
                        <CenteredBox>
                            <Pagination
                                count={currentOrders?.totalPages}
                                page={currentPage}
                                onChange={handlePageChange}
                            />
                        </CenteredBox>
                    )}
                </Box>
            ) : !isLoading && <NoOrdersFound />}
        </CenteredLayout>
    )
}

export default withAuth(OrdersPage)