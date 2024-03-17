import { ChangeEvent, FC } from 'react'

import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import Head from 'next/head'

import { Divider } from '@mui/material'

import withAuth from '@/hoc/withAuth'

import useOrders from '@/hooks/order/useOrders'

import NoOrdersFound from '@/components/common/errors/NoResultFound'
import PaginationComponent from '@/components/common/PaginationComponent'

import BackButton from '@/components/common/button/BackButton'

import CenteredLayout from '@/components/common/layout/CenteredLayout'
import LoadingState from '@/components/common/layout/LoadingState'

import PageHeader from '@/components/common/page/PageHeader'
import PageTitle from '@/components/common/page/PageTitle'

import OrdersFilter from '@/components/order/OrdersFilter'
import OrdersTable from '@/components/order/OrdersTable'

import PagedResponse from '@/types/PagedResponse.type'
import Order from '@/types/order/Order.type'

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

    if (isLoading) return <LoadingState />

    const renderOrders = (currentOrders: PagedResponse<Order>,
        currentPage: number, handlePageChange: (_: ChangeEvent<unknown>, page: number) => void) => {
        if (currentOrders.content.length <= 0)
            return <NoOrdersFound text={translation('noOrderFound')} />

        return (
            <>
                <OrdersTable orders={currentOrders.content} />
                
                {Number(currentOrders.totalPages) > 1 && (
                    <PaginationComponent
                        count={currentOrders.totalPages}
                        page={currentPage}
                        onChange={handlePageChange}
                    />
                )}
            </>
        )

    }

    return (
        <>
            <Head>
                <title>
                    {translation('title')} - {translation('orderHistory')}
                </title>
            </Head>

            <CenteredLayout>
                <BackButton location='/' />

                <PageHeader>
                    <PageTitle text={translation('orderHistory')} />

                    <OrdersFilter
                        filteredDate={filteredDate}
                        setFilteredDateAndResetPage={setFilteredDateAndResetPage}
                        filteredStatus={filteredStatus}
                        setFilteredStatusAndResetPage={setFilteredStatusAndResetPage}
                    />
                </PageHeader>

                <Divider sx={{ mb: 5 }} />

                {currentOrders?.content && renderOrders(currentOrders, currentPage, handlePageChange)}
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