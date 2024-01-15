import { FC } from 'react'
import { useQuery } from 'react-query'

import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import Head from 'next/head'

import { Box, SxProps, Divider, Typography, CircularProgress } from '@mui/material'

import withAuth from '@/hoc/withAuth'

import useProducts from '@/hooks/useProducts'

import fetchOrderById from '@/api/order/fetchOrderById'

import CenteredLayout from '@/components/common/layout/CenteredLayout'
import CenteredBox from '@/components/common/layout/CenteredBox'
import BackButton from '@/components/common/button/BackButton'
import PageTitle from '@/components/common/page/PageTitle'
import PaginationComponent from '@/components/common/PaginationComponent'

import OrderStatusIndicator from '@/components/order/OrderStatusIndicator'

import ProductsTable from '@/components/product/ProductsTable'

import { formatDateLocale } from '@/utils/dateUtils'

const OrderPage: FC = () => {
    const { query, locale } = useRouter()
    const { id } = query

    const { data: order, isLoading } = useQuery(['order', id],
        () => fetchOrderById(id as string), { enabled: !!id })

    const itemIds = order?.items.map(item => item.id)

    const { currentProducts, currentPage, handlePageChange } = useProducts(false, 5, itemIds)
    const { t: translation } = useTranslation()

    const infoTextStyle: SxProps = {
        color: 'text.primary',
        fontWeight: 600,
        mb: 1,
        fontSize: { xs: '0.7em', sm: '0.75em', md: '0.8em', lg: '0.88em' }
    }
    const valueTextStyle: SxProps = { ...infoTextStyle, color: 'text.secondary' }

    const formattedDate = order?.date && locale && formatDateLocale(order.date, locale)

    if (isLoading) return (
        <CenteredBox>
            <CircularProgress color="error" />
        </CenteredBox>
    )

    return (
        <>
            <Head>
                <title>
                    {translation('title')} - {translation('orderLabel')} #{order?.id}
                </title>
            </Head>

            <CenteredLayout>
                <BackButton location='/orders' />

                <PageTitle text={translation('orderLabel')} id={order?.id} />

                <Box display="flex" sx={{
                    mt: 1
                }}>
                    <Typography width={50} variant="body2" sx={infoTextStyle}>
                        {translation('totalLabel')}:
                    </Typography>

                    <Typography variant="body2" sx={valueTextStyle}>
                        €{order?.totalPrice}
                    </Typography>
                </Box>

                <Box display="flex">
                    <Typography width={50} variant="body2" sx={infoTextStyle}>
                        {translation('dateLabel')}:
                    </Typography>

                    <Typography variant="body2" sx={valueTextStyle}>
                        {formattedDate}
                    </Typography>
                </Box>

                <Box display="flex">
                    <Typography width={50} variant="body2" sx={infoTextStyle}>
                        {translation('statusLabel')}:
                    </Typography>

                    {order && <OrderStatusIndicator status={order.status} size='small' />}
                </Box>

                <Typography variant="h6" component="h1" sx={{
                    fontWeight: 600,
                    mb: 2,
                    mt: 5,
                    fontSize: { xs: '0.9em', sm: '1em', md: '1.1em', lg: '1.2em' }
                }}>
                    {translation('products')}
                </Typography>

                <Divider sx={{ mb: 5 }} />

                {currentProducts && order &&
                    <ProductsTable
                        products={currentProducts}
                        orderItems={order?.items}
                    />}

                {Number(currentProducts?.totalPages) > 1 && (
                    <PaginationComponent
                        count={currentProducts?.totalPages}
                        page={currentPage}
                        onChange={handlePageChange}
                    />
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

export default withAuth(OrderPage)
