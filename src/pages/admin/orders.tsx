import { FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'

import {
    Alert,
    Box, CircularProgress, Divider,
    Pagination, Snackbar, Typography
} from '@mui/material'

import Head from 'next/head'

import withAuth from '@/hoc/withAuth'
import withAdminAuth from '@/hoc/withAdminAuth'

import { RootState } from '@/store'

import useOrders from '@/hooks/order/useOrders'
import useOrderStatistics from '@/hooks/order/useOrderStatistics'

import { hideSnackbar } from '@/slices/snackbarSlice'

import CenteredLayout from '@/components/common/CenteredLayout'
import BackButton from '@/components/common/button/BackButton'
import CenteredBox from '@/components/common/CenteredBox'
import NoOrdersFound from '@/components/common/NoResultsFound'

import OrdersFilter from '@/components/order/OrdersFilter'
import AdminOrdersStatisticsDisplay from '@/components/order/admin/AdminOrdersStatisticsDisplay'
import AdminOrdersTable from '@/components/order/admin/AdminOrdersTable'

const AdminOrdersPage: FC = () => {
    const dispatch = useDispatch()
    const { open, message } = useSelector((state: RootState) => state.snackbar)
    const { t: translation } = useTranslation()

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

    const { statistics } = useOrderStatistics()

    const handleCloseSnackbar = () => dispatch(hideSnackbar())

    if (isLoading) return (
        <CenteredBox>
            <CircularProgress color="error" />
        </CenteredBox>
    )

    return (
        <>
            <Head>
                <title>
                    {translation('title')} - {translation('orderManagement')}
                </title>
            </Head>

            <CenteredLayout>
                <BackButton location='/' />

                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 3
                }}>
                    <Typography variant="h6" component="h1" fontWeight={600}>
                        {translation('orderManagement')}
                    </Typography>

                    <OrdersFilter
                        filteredDate={filteredDate}
                        setFilteredDateAndResetPage={setFilteredDateAndResetPage}
                        filteredStatus={filteredStatus}
                        setFilteredStatusAndResetPage={setFilteredStatusAndResetPage}
                    />
                </Box>

                <Divider sx={{ mb: 3 }} />

                <Box display="flex">
                    <AdminOrdersStatisticsDisplay
                        count={statistics?.deliveredToday}
                        label={translation('orderDeliveredToday')}
                    />

                    <AdminOrdersStatisticsDisplay
                        count={statistics?.pending}
                        label={translation('pendingOrders')}
                    />

                    <AdminOrdersStatisticsDisplay
                        count={statistics?.delivering}
                        label={translation('incomingOrders')}
                    />
                </Box>

                {currentOrders?.content && (
                    currentOrders.content.length > 0 ? (
                        <>
                            <AdminOrdersTable orders={currentOrders.content} />

                            {currentOrders.totalPages > 1 && (
                                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
                                    <Pagination
                                        count={currentOrders.totalPages}
                                        page={currentPage}
                                        onChange={handlePageChange}
                                    />
                                </Box>
                            )}
                        </>
                    ) : <NoOrdersFound text={translation('noOrdersFound')} />
                )}

                <Snackbar
                    open={open}
                    autoHideDuration={6000}
                    onClose={handleCloseSnackbar}
                >
                    <Alert
                        onClose={handleCloseSnackbar}
                        severity="success"
                        sx={{ width: '100%' }}
                    >
                        {message}
                    </Alert>
                </Snackbar>
            </CenteredLayout>
        </>
    )
}

export const getServerSideProps = async ({ locale }: { locale: string }) => ({
    props: {
        ...(await serverSideTranslations(locale))
    }
})

export default withAuth(withAdminAuth(AdminOrdersPage))
