import { FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import {
    Alert,
    Box, CircularProgress, Divider,
    Snackbar
} from '@mui/material'

import Head from 'next/head'

import withAdminAuth from '@/hoc/withAdminAuth'
import withAuth from '@/hoc/withAuth'

import { RootState } from '@/store'

import useOrders from '@/hooks/order/useOrders'
import useOrderStatistics from '@/hooks/order/useOrderStatistics'

import { hideOrdersSnackbar } from '@/slices/snackbar/ordersSnackbarSlice'

import BackButton from '@/components/common/button/BackButton'
import CenteredBox from '@/components/common/layout/CenteredBox'
import CenteredLayout from '@/components/common/layout/CenteredLayout'
import NoOrdersFound from '@/components/common/NoResultsFound'
import PageHeader from '@/components/common/page/PageHeader'
import PageTitle from '@/components/common/page/PageTitle'
import PaginationComponent from '@/components/common/PaginationComponent'

import AdminOrdersStatisticsDisplay from '@/components/order/admin/AdminOrdersStatisticsDisplay'
import AdminOrdersTable from '@/components/order/admin/AdminOrdersTable'
import OrdersFilter from '@/components/order/OrdersFilter'

const AdminOrdersPage: FC = () => {
    const { open, message } = useSelector((state: RootState) => state.ordersSnackbar)
    const dispatch = useDispatch()
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

    const handleCloseSnackbar = () => dispatch(hideOrdersSnackbar())

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

                <PageHeader>
                    <PageTitle text={translation('orderManagement')} />

                    <OrdersFilter
                        filteredDate={filteredDate}
                        setFilteredDateAndResetPage={setFilteredDateAndResetPage}
                        filteredStatus={filteredStatus}
                        setFilteredStatusAndResetPage={setFilteredStatusAndResetPage}
                    />
                </PageHeader>

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
                                <PaginationComponent
                                    count={currentOrders.totalPages}
                                    page={currentPage}
                                    onChange={handlePageChange}
                                />
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
