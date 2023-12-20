import { FC } from 'react'

import { Box, Divider, Pagination, Typography } from '@mui/material'

import useOrders from '@/hooks/order/useOrders'

import CenteredLayout from '@/components/common/CenteredLayout'
import BackButton from '@/components/common/BackButton'

import OrdersFilter from '@/components/order/OrdersFilter'
import NoOrdersFound from '@/components/order/NoOrdersFound'
import AdminOrdersTable from '@/components/order/admin/AdminOrdersTable'

const AdminOrdersContent: FC = () => {
    const {
        currentOrders,
        isLoading,
        currentPage,
        handlePageChange,
        filteredDate,
        setFilteredDateAndResetPage,
        filteredStatus,
        setFilteredStatusAndResetPage,
    } = useOrders('/orders')

    return (
        <CenteredLayout>
            <BackButton />

            <Typography variant="h5" component="h1" fontWeight={700} gutterBottom>
                Pannello degli ordini
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
                    <AdminOrdersTable orders={currentOrders.content} />

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

export default AdminOrdersContent
