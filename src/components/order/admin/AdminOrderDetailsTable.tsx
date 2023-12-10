import { FC, useState } from 'react'

import { useQuery } from 'react-query'

import Image from 'next/image'

import {
    SxProps, TableContainer, Table, TableHead, TableRow,
    TableCell, TableBody, Pagination
} from '@mui/material'

import fetchPizzas from '@/api/fetchPizzas'

import CenteredBox from '@/components/layout/CenteredBox'

import Order from '@/types/order/Order.type'

type AdminOrderDetailsTableProps = {
    order: Order,
}

const AdminOrderDetailsTable: FC<AdminOrderDetailsTableProps> = ({ order }) => {
    const [currentPage, setCurrentPage] = useState(1)

    const itemIds = order.items.map(item => item.id)

    const { data: currentPizzas } = useQuery(['pizzas', order.id, currentPage],
        () => fetchPizzas(currentPage - 1, itemIds), { keepPreviousData: true })

    const tableCellStyle: SxProps = { color: '#BEBEBE' }

    const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => setCurrentPage(value)

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
                    {currentPizzas?.content.map(({ id, imageUrl, name, price, ingredients }, index) => {
                        const isLast = index === currentPizzas.content.length - 1
                        const tableCellStyle: SxProps = { border: isLast ? 'none' : 'default', pb: isLast ? 6 : 'none' }

                        const formattedIngredients = ingredients.map((ingredient, index) =>
                            index === 0 ? ingredient : ingredient.toLowerCase())

                        const orderItem = order.items.find(item => item.id === id)
                        const quantity = orderItem ? orderItem.quantity : 0

                        if (quantity === 0) return null

                        return (
                            <TableRow key={id}>
                                <TableCell sx={tableCellStyle}>
                                    {id}
                                </TableCell>

                                <TableCell sx={tableCellStyle}>
                                    <Image
                                        src={imageUrl}
                                        alt="Pizza item"
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

            {Number(currentPizzas?.totalPages) > 1 && (
                <CenteredBox>
                    <Pagination
                        count={currentPizzas?.totalPages}
                        page={currentPage}
                        onChange={handlePageChange}
                        sx={{ mt: '-2em', mb: 4 }}
                    />
                </CenteredBox>
            )}
        </TableContainer>
    )
}

export default AdminOrderDetailsTable
