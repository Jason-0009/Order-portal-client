import { FC } from 'react'

import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'

import {
    Box, CircularProgress, Divider,
    Pagination, Typography
} from '@mui/material'

import withAuth from '@/hoc/withAuth'
import withAdminAuth from '@/hoc/withAdminAuth'

import useOrders from '@/hooks/order/useOrders'
import useOrderStatistics from '@/hooks/order/useOrderStatistics'

import CenteredLayout from '@/components/common/CenteredLayout'
import BackButton from '@/components/common/button/BackButton'
import CenteredBox from '@/components/common/CenteredBox'

import OrdersFilter from '@/components/order/OrdersFilter'
import StatisticsDisplay from '@/components/order/admin/StatisticsDisplay'
import AdminOrdersTable from '@/components/order/admin/AdminOrdersTable'
import NoOrdersFound from '@/components/common/NoResultsFound'

const AdminOrdersPage: FC = () => {
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

    const { statistics } = useOrderStatistics()

    if (isLoading) return (
        <CenteredBox>
            <CircularProgress color="info" />
        </CenteredBox>
    )

    return (
        <CenteredLayout>
            <BackButton location='/' />

            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 3
            }}>
                <Typography variant="h6" component="h1" fontWeight={600}>
                    {translation('orderPanel')}
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
                <StatisticsDisplay
                    count={statistics?.deliveredToday}
                    label={translation('orderDeliveredToday')}
                />

                <StatisticsDisplay
                    count={statistics?.pending}
                    label={translation('pendingOrders')}
                />

                <StatisticsDisplay
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
        </CenteredLayout>
    )
}

export const getServerSideProps = async ({ locale }: { locale: string }) => ({
    props: {
        ...(await serverSideTranslations(locale))
    }
})

export default withAuth(withAdminAuth(AdminOrdersPage))
