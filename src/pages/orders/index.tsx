import { FC } from 'react'

import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { Typography, Divider, Pagination, Box, CircularProgress } from '@mui/material'

import withAuth from '@/hoc/withAuth'

import useOrders from '@/hooks/order/useOrders'

import CenteredLayout from '@/components/common/CenteredLayout'
import BackButton from '@/components/common/button/BackButton'
import CenteredBox from '@/components/common/CenteredBox'

import OrdersFilter from '@/components/order/OrdersFilter'
import OrdersTable from '@/components/order/OrdersTable'
import NoOrdersFound from '@/components/common/NoResultsFound'

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

    const { t: translation } = useTranslation()

    if (isLoading) return (
        <CenteredBox>
            <CircularProgress color="error" />
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
                    {translation('orderHistory')}
                </Typography>

                <OrdersFilter
                    filteredDate={filteredDate}
                    setFilteredDateAndResetPage={setFilteredDateAndResetPage}
                    filteredStatus={filteredStatus}
                    setFilteredStatusAndResetPage={setFilteredStatusAndResetPage}
                />
            </Box>

            <Divider sx={{ mb: 5 }} />

            {currentOrders?.content && (
                currentOrders.content.length > 0 ? (
                    <>
                        <OrdersTable orders={currentOrders.content} />

                        {Number(currentOrders?.totalPages) > 1 && (
                            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
                                <Pagination
                                    color='secondary'
                                    count={currentOrders?.totalPages}
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

export default withAuth(OrdersPage)