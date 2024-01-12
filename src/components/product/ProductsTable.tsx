import { FC } from 'react'

import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'

import {
    SxProps, Table, TableBody,
    TableCell, TableContainer,
    TableHead, TableRow
} from '@mui/material'

import formatIngredients from '@/utils/formatIngredients'

import Product from '@/types/Product.type'
import PagedResponse from '@/types/PagedResponse.type'
import OrderItem from '@/types/order/OrderItem.type'

type ProductsTableProps = {
    products: PagedResponse<Product>,
    orderItems: OrderItem[]
}

const ProductsTable: FC<ProductsTableProps> = ({ products, orderItems }) => {
    const { locale } = useRouter()
    const { t: translation } = useTranslation()

    const tableCellStyle: SxProps = {
        pt: 3,
        fontSize: '14px',
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

                        <TableCell sx={{ ...tableCellStyle, width: '10%' }}>
                            {translation('totalLabel')}
                        </TableCell>

                        <TableCell sx={tableCellStyle}>
                            {translation('ingredientsLabel')}
                        </TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {products.content.map((product, index, array) => {
                        const orderItem = orderItems.find(item => item.id === product.id)

                        const { id, imageUrl, name, ingredients, price } = product

                        const total = orderItem && price * orderItem?.quantity
                        const formattedIngredients = formatIngredients(ingredients, locale)

                        const isFirstItem = index === 0
                        const isLastItem = index === array.length - 1

                        const tableCellStyle: SxProps = {
                            borderBottom: 'none',
                            pt: isFirstItem ? 4 : 1,
                            pb: isLastItem ? 4 : 'initial',
                            color: 'text.secondary'
                        }

                        return (
                            <TableRow key={id}>
                                <TableCell sx={{ ...tableCellStyle, pl: 4 }}>
                                    <Image
                                        src={imageUrl}
                                        width={40}
                                        height={40}
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
