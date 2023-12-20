import { FC } from 'react'

import { Typography, Divider, Pagination, Box } from '@mui/material'

import withAuth from '@/hoc/withAuth'

import useOrders from '@/hooks/order/useOrders'

import CenteredLayout from '@/components/common/CenteredLayout'

import BackButton from '@/components/common/BackButton'

import OrdersFilter from '@/components/order/OrdersFilter'
import OrdersTable from '@/components/order/OrdersTable'
import NoOrdersFound from '@/components/order/NoOrdersFound'

const OrdersPage: FC = () => {
    const {
        currentOrders,
        isLoading,
        currentPage,
        handlePageChange,
        filteredDate,
        setFilteredDateAndResetPage,
        filteredStatus,
        setFilteredStatusAndResetPage,
    } = useOrders('/orders/user')

    return (
        <CenteredLayout>
            <BackButton />

            <Typography variant="h5" component="h1" fontWeight={600} gutterBottom>
                Cronologia ordini
            </Typography>

            <Divider sx={{ mb: 3 }} />

            <OrdersFilter
                filteredDate={filteredDate}
                setFilteredDateAndResetPage={setFilteredDateAndResetPage}
                filteredStatus={filteredStatus}
                setFilteredStatusAndResetPage={setFilteredStatusAndResetPage}
            />

            {currentOrders && currentOrders.content.length > 0 ? (
                <Box>
                    {<OrdersTable orders={currentOrders.content} />}

                    {Number(currentOrders?.totalPages) > 1 && (
                        <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
                            <Pagination
                                count={currentOrders?.totalPages}
                                page={currentPage}
                                onChange={handlePageChange}
                            />
                        </Box>
                    )}
                </Box>
            ) : !isLoading && <NoOrdersFound />}
        </CenteredLayout>
    )
}

export default withAuth(OrdersPage)