import { FC } from 'react'

import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'

import Image from 'next/image'

import {
    SxProps,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead, TableRow,
    Theme,
    useMediaQuery
} from '@mui/material'

import useProducts from '@/hooks/useProducts'

import PaginationComponent from '@/components/common/PaginationComponent'
import Order from '@/types/order/Order.type'

type AdminOrderDetailsTableProps = {
    order: Order,
}

const AdminOrderDetailsTable: FC<AdminOrderDetailsTableProps> = ({ order }) => {
    const itemIds = order.items.map(item => item.id)

    const { locale } = useRouter()
    const { t: translation } = useTranslation()

    const {
        currentProducts,
        currentPage,
        handlePageChange,
    } = useProducts(false, 3, itemIds)

    const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'))
    const isTablet = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'))

    const tableCellStyle: SxProps = {
        color: 'text.main',
        fontSize: { xs: '11px', md: '12px', lg: '14px' },
        fontWeight: 600
    }

    return (
        <TableContainer sx={{ maxWidth: '90%', ml: 5, my: 2, overflow: 'hidden' }}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell sx={tableCellStyle}>
                            Id
                        </TableCell>

                        <TableCell sx={tableCellStyle}>
                            {translation('imageLabel')}
                        </TableCell>

                        <TableCell sx={tableCellStyle}>
                            {translation('nameLabel')}
                        </TableCell>

                        <TableCell sx={tableCellStyle}>
                            {translation('priceLabel')}
                        </TableCell>

                        <TableCell sx={tableCellStyle}>
                            {translation('ingredientsLabel')}
                        </TableCell>

                        <TableCell sx={tableCellStyle}>
                            {translation('amountLabel')}
                        </TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {currentProducts?.content.map(product => {
                        const { id, imageUrl, name, price, ingredients } = product
                        const tableCellStyle: SxProps = {
                            border: 'none',
                            color: 'text.secondary',
                            fontSize: { xs: '11px', sm: '12px', md: '13px', lg: '14px' }
                        }

                        const formattedIngredients = locale && ingredients[locale] ?
                            ingredients[locale].map((ingredient, index) => index === 0 ?
                                ingredient : ingredient.toLowerCase()) : []

                        const orderItem = order.items.find(item => item.id === id)
                        const quantity = orderItem?.quantity

                        if (!quantity) return null

                        return (
                            <TableRow key={id}>
                                <TableCell sx={tableCellStyle}>
                                    {id}
                                </TableCell>

                                <TableCell sx={tableCellStyle}>
                                    <Image
                                        src={imageUrl}
                                        alt="Product item"
                                        width={isMobile ? 40 : isTablet ? 50 : 60}
                                        height={isMobile ? 40 : isTablet ? 50 : 60}
                                    />
                                </TableCell>

                                <TableCell sx={tableCellStyle}>
                                    {locale && name[locale]}
                                </TableCell>

                                <TableCell sx={tableCellStyle}>
                                    € {price}
                                </TableCell>

                                <TableCell sx={tableCellStyle}>
                                    {formattedIngredients.join(', ')}
                                </TableCell>

                                <TableCell sx={tableCellStyle}>
                                    {quantity}
                                </TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>

            {Number(currentProducts?.totalPages) > 1 && (
                <PaginationComponent
                    count={currentProducts?.totalPages}
                    page={currentPage}
                    onChange={handlePageChange}
                    color='primary'
                    sx={{ mt: { xs: '-0.6em', sm: 1 }, mb: 2 }}
                />
            )}
        </TableContainer>
    )
}

export default AdminOrderDetailsTable
