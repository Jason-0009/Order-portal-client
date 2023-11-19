import { FC } from 'react'

import {
    SxProps, Table, TableBody,
    TableCell, TableContainer, 
    TableHead, TableRow
} from '@mui/material'

import OrdersTableRow from './OrdersTableRow'

import Order from '@/types/order/Order.type'

import PagedResponse from '@/types/PagedResponse.type'

type OrdersTableProps = {
    orders: PagedResponse<Order> | undefined
}

const OrdersTable: FC<OrdersTableProps> = ({ orders }) => {
    const tableCellStyle: SxProps = {
        borderBottom: 'none',
        fontSize: '14px',
        fontWeight: 600,
        color: '#BAB5B5',
        textTransform: 'uppercase'
    }

    return (
        <TableContainer>
            <Table sx={{
                borderCollapse: 'separate',
                borderSpacing: '5px 30px'
            }}>
                <TableHead>
                    <TableRow>
                        <TableCell sx={tableCellStyle}>
                            Ordine
                        </TableCell>

                        <TableCell sx={tableCellStyle}>
                            Data
                        </TableCell>

                        <TableCell sx={tableCellStyle}>
                            Stato
                        </TableCell>

                        <TableCell sx={tableCellStyle}>
                            Totale
                        </TableCell>
                    </TableRow>
                </TableHead>
                
                <TableBody>
                    {orders?.content.map((order, index) => (
                        <OrdersTableRow key={index} order={order} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default OrdersTable
