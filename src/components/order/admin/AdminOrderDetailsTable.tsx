import { FC, useState } from 'react'
import { useQuery } from 'react-query'

import Image from 'next/image'

import {
    SxProps, TableContainer, Table, TableHead, TableRow,
    TableCell, TableBody, Pagination, Box
} from '@mui/material'

import fetchProducts from '@/api/fetchProducts'

import Order from '@/types/order/Order.type'
import useProducts from '@/hooks/useProducts'

type AdminOrderDetailsTableProps = {
    order: Order,
}

const AdminOrderDetailsTable: FC<AdminOrderDetailsTableProps> = ({ order }) => {
    const itemIds = order.items.map(item => item.id)

    const {
        currentProducts,
        currentPage,
        handlePageChange,
    } = useProducts(false, itemIds)

    const tableCellStyle: SxProps = { color: '#BEBEBE' }

    return (
        <TableContainer sx={{ maxWidth: '80%', ml: 10, overflow: 'hidden' }}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell sx={tableCellStyle}>
                            Id
                        </TableCell>

                        <TableCell sx={tableCellStyle}>
                            Immagine
                        </TableCell>

                        <TableCell sx={tableCellStyle}>
                            Nome
                        </TableCell>

                        <TableCell sx={tableCellStyle}>
                            Prezzo
                        </TableCell>

                        <TableCell sx={tableCellStyle} align="center">
                            Ingredienti
                        </TableCell>

                        <TableCell sx={tableCellStyle}>
                            Quantità
                        </TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {currentProducts?.content.map(({ id, imageUrl, name, price, ingredients }, index) => {
                        const isLast = index === currentProducts.content.length - 1
                        const tableCellStyle: SxProps = { border: isLast ? 'none' : 'default', pb: isLast ? 6 : 'none' }

                        const formattedIngredients = ingredients.map((ingredient, index) =>
                            index === 0 ? ingredient : ingredient.toLowerCase())

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
                                        width={60}
                                        height={60}
                                    />
                                </TableCell>

                                <TableCell sx={tableCellStyle}>
                                    {name}
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
                <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
                    <Pagination
                        count={currentProducts?.totalPages}
                        page={currentPage}
                        onChange={handlePageChange}
                        sx={{ mt: '-2em', mb: 4 }}
                    />
                </Box>
            )}
        </TableContainer>
    )
}

export default AdminOrderDetailsTable
