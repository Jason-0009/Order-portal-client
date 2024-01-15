import { FC } from 'react'

import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import Head from 'next/head'

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
    } = useOrders('/orders/user')

    if (isLoading) return (
        <CenteredBox>
            <CircularProgress color="error" />
        </CenteredBox>
    )

    return (
        <>
            <Head>
                <title>
                    {translation('title')} - {translation('orderHistory')}
                </title>
            </Head>

            <CenteredLayout>
                <BackButton location='/' />

                <Box sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'row' },
                    alignItems: { xs: 'normal', sm: 'center' },
                    justifyContent: 'space-between',
                    mb: 3
                }}>
                    <Typography variant="h6" component="h1" fontWeight={600} sx={{
                        fontSize: { xs: '0.9em', sm: '1em', md: '1.1em', lg: '1.2em' },
                        mb: { xs: 1, sm: 0 }
                    }}>
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
                                <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
                                    <Pagination
                                        color='secondary'
                                        count={currentOrders?.totalPages}
                                        page={currentPage}
                                        onChange={handlePageChange}
                                        sx={{
                                            '& .MuiPaginationItem-root': {
                                                fontSize: { xs: '0.7rem', sm: '0.8rem' }
                                            }
                                        }}
                                    />
                                </Box>
                            )}
                        </>
                    ) : <NoOrdersFound text={translation('noOrdersFound')} />
                )}
            </CenteredLayout>
        </>
    )
}

export const getServerSideProps = async ({ locale }: { locale: string }) => ({
    props: {
        ...(await serverSideTranslations(locale))
    }
})

export default withAuth(OrdersPage)