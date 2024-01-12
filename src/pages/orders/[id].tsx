import { FC } from 'react'

import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import Head from 'next/head'

import { Box, SxProps, Divider, Pagination, Typography } from '@mui/material'

import withAuth from '@/hoc/withAuth'

import useOrder from '@/hooks/order/useOrder'
import useProducts from '@/hooks/useProducts'

import CenteredLayout from '@/components/common/CenteredLayout'
import BackButton from '@/components/common/button/BackButton'

import OrderStatusIndicator from '@/components/order/OrderStatusIndicator'

import ProductsTable from '@/components/product/ProductsTable'

import { formatDateLocale } from '@/utils/dateUtils'

const OrderPage: FC = () => {
    const { query, locale } = useRouter()
    const { id } = query

<<<<<<< HEAD
    const order = useOrder(id as string)
=======
    const { data: order } = useQuery(['order', id], () => fetchOrderById(id as string),
        { enabled: !!id })

    const infoTextStyle: SxProps = { color: 'text.primary', fontWeight: 600, mb: 1 }
    const valueTextStyle: SxProps = { ...infoTextStyle, color: 'text.secondary' }

    const formattedDate = order?.date && locale && formatDateLocale(order.date, locale)

    return (
        <>
            <Head>
                <title>
                    {translation('title')} - {translation('orderLabel')} #{order?.id}
                </title>
            </Head>

            <CenteredLayout>
                <BackButton location='/orders' />

                <Typography variant="h6" component="h1" fontWeight={600} mb={1}>
                    {translation('orderLabel')} <Box component="span" color='link.main'>
                        #{order?.id}
                    </Box>
                </Typography>

                <Box display="flex">
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

                <Typography variant="h6" component="h1" fontWeight={600} mb={2} mt={5}>
                    {translation('products')}
                </Typography>

                <Divider sx={{ mb: 5 }} />

                {currentProducts && order &&
                    <ProductsTable
                        products={currentProducts}
                        orderItems={order?.items}
                    />}

                {Number(currentProducts?.totalPages) > 1 && (
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                        <Pagination
                            color="secondary"
                            count={currentProducts?.totalPages}
                            page={currentPage}
                            onChange={handlePageChange}
                            sx={{ mt: 5 }}
                        />
                    </Box>
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
