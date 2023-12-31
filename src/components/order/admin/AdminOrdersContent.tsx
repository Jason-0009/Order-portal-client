import { FC } from 'react'

import { useTranslation } from 'next-i18next'

import { Box, CircularProgress, Divider, Pagination, Typography } from '@mui/material'

import useOrders from '@/hooks/order/useOrders'

import CenteredBox from '@/components/common/CenteredBox'
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

    const { t: translation } = useTranslation()

    if (isLoading) return (
        <CenteredBox>
            <CircularProgress />
        </CenteredBox>
    )

    return (
        <CenteredLayout>
            <BackButton location='/' />

            <Typography variant="h5" component="h1" fontWeight={700} gutterBottom>
                {translation('orderPanel')}
            </Typography>

            <Divider sx={{ mb: 3 }} />

            <OrdersFilter
                filteredDate={filteredDate}
                setFilteredDateAndResetPage={setFilteredDateAndResetPage}
                filteredStatus={filteredStatus}
                setFilteredStatusAndResetPage={setFilteredStatusAndResetPage}
            />

            {currentOrders?.content && (
                currentOrders.content.length > 0 ? (
                    <>
                        <AdminOrdersTable orders={currentOrders.content} />

                        {currentOrders.totalPages > 1 && (
                            <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
                                <Pagination
                                    count={currentOrders.totalPages}
                                    page={currentPage}
                                    onChange={handlePageChange}
                                />
                            </Box>
                        )}
                    </>
                ) : <NoOrdersFound />
            )}
        </CenteredLayout>
    )
}

export default AdminOrdersContent
