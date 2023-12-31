import { FC } from 'react'

import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { Typography, Divider, Pagination, Box, CircularProgress } from '@mui/material'

import withAuth from '@/hoc/withAuth'

import useOrders from '@/hooks/order/useOrders'

import CenteredLayout from '@/components/common/CenteredLayout'
import BackButton from '@/components/common/BackButton'
import CenteredBox from '@/components/common/CenteredBox'

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

    const { t: translation } = useTranslation()

    if (isLoading) return (
        <CenteredBox>
            <CircularProgress />
        </CenteredBox>
    )

    return (
        <CenteredLayout>
            <BackButton location='/' />

            <Typography variant="h5" component="h1" fontWeight={600} gutterBottom>
                {translation('orderHistory')}
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
                        <OrdersTable orders={currentOrders.content} />

                        {Number(currentOrders?.totalPages) > 1 && (
                            <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
                                <Pagination
                                    count={currentOrders?.totalPages}
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

export const getServerSideProps = async ({ locale }: { locale: string }) => ({
    props: {
        ...(await serverSideTranslations(locale))
    }
})

export default withAuth(OrdersPage)