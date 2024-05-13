import { FC } from 'react'

import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import { useRouter } from 'next/router'

import { SxProps, Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Theme, useMediaQuery } from '@mui/material'

import formatIngredients from '@/utils/formatIngredients'

import PagedResponse from '@/types/PagedResponse.type'
import Product from '@/types/Product.type'
import OrderItem from '@/types/order/OrderItem.type'

type ProductsTableProps = {
    products: PagedResponse<Product>,
    orderItems: OrderItem[]
}

const ProductsTable: FC<ProductsTableProps> = ({ products, orderItems }) => {
    const { locale } = useRouter()
    const { t: translation } = useTranslation()

    const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('xs'))
    const isTablet = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'))

    const tableCellStyle: SxProps = {
        pt: 3,
        fontSize: { xs: '11px', sm: '12px', md: '13px', lg: '14px' },
        fontWeight: 600,
        color: 'text.primary'
    }

    return (
        <TableContainer>
            <Table sx={{
                backgroundColor: 'secondary.main',
                borderRadius: '20px'
            }}>
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ ...tableCellStyle, width: '15%', pl: 4 }}>
                            {translation('previewLabel')}
                        </TableCell>

                        <TableCell sx={{ ...tableCellStyle, width: '20%' }}>
                            {translation('menuLabel')}
                        </TableCell>

                        <TableCell sx={{ ...tableCellStyle, width: '15%' }}>
                            {translation('totalLabel')}
                        </TableCell>

                        <TableCell sx={{ ...tableCellStyle, width: '35%' }}>
                            {translation('ingredientsLabel')}
                        </TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {products.content.map(({ id, imageUrl, name, ingredients, price }, index, array) => {
                        const orderItem = orderItems.find(item => item.id === id)

                        if (!orderItem) return

                        const total = price * orderItem?.quantity
                        const formattedIngredients = formatIngredients(ingredients, locale)

                        const isFirstItem = index === 0
                        const isLastItem = index === array.length - 1

                        const tableCellStyle: SxProps = {
                            borderBottom: 'none',
                            pt: isFirstItem ? 4 : 1,
                            pb: isLastItem ? 2 : 1,
                            color: 'text.secondary',
                            fontSize: { xs: '11px', sm: '12px', md: '13px', lg: '14px' }
                        }

                        return (
                            <TableRow key={id}>
                                <TableCell sx={{ ...tableCellStyle, pl: 4 }}>
                                    <Image
                                        src={imageUrl}
                                        width={isMobile ? 30 : isTablet ? 35 : 40}
                                        height={isMobile ? 30 : isTablet ? 35 : 40}
                                        alt="Product image"
                                    />
                                </TableCell>

                                <TableCell sx={{ ...tableCellStyle }}>
                                    {orderItem?.quantity} x {locale && name[locale]}
                                </TableCell>

                                <TableCell sx={{ ...tableCellStyle }}>
                                    € {total}
                                </TableCell>

                                <TableCell sx={{ ...tableCellStyle }}>
                                    {formattedIngredients.join(', ')}.
                                </TableCell>
                            </TableRow >
                        )
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default ProductsTable
