import { FC } from 'react'

import { Box, Divider, Pagination, Typography } from '@mui/material'

import useOrders from '@/hooks/useOrders'

import CenteredLayout from '@/components/layout/CenteredLayout'
import CenteredBox from '@/components/layout/CenteredBox'

import BackButton from '@/components/BackButton'

import OrdersFilter from '@/components/order/OrdersFilter'
import NoOrdersFound from '@/components/order/NoOrdersFound'

import AdminOrdersTable from '@/components/order/admin/AdminOrdersTable'

const AdminOrdersContent: FC = () => {
    const {
        currentOrders,
        isLoading,
        refetch,
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

            <Typography variant="h5" component="h1" fontWeight={700} gutterBottom>
                Pannello degli ordini
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
                    <AdminOrdersTable orders={currentOrders.content} />

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

export default AdminOrdersContent
