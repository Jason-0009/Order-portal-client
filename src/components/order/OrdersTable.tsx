import { FC } from 'react'

import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import NextLink from 'next/link'

import {
    Link,
    SxProps, Table, TableBody,
    TableCell, TableContainer,
    TableHead, TableRow
} from '@mui/material'

import OrderStateIndicator from './OrderStateIndicator'

import { formatDateLocale } from '@/utils/dateUtils'

import Order from '@/types/order/Order.type'

type OrdersTableProps = {
    orders: Order[]
}

const OrdersTable: FC<OrdersTableProps> = ({ orders }) => {
    const { locale } = useRouter()
    const { t: translation } = useTranslation()

    const tableCellStyle: SxProps = {
        borderBottom: 'none',
        fontSize: '15px',
        fontWeight: 700,
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
                            Id
                        </TableCell>

                        <TableCell sx={tableCellStyle}>
                            {translation('dateLabel')}
                        </TableCell>

                        <TableCell sx={tableCellStyle}>
                            {translation('statusLabel')}
                        </TableCell>

                        <TableCell sx={tableCellStyle} align="center">
                            {translation('totalLabel')}
                        </TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {orders.map(order => {
                        const { id, date, status, totalPrice } = order

                        const formattedDate = date && locale && formatDateLocale(date, locale)

                        const tableCellStyle: SxProps = { borderBottom: 'none', fontWeight: 600 }

                        return (
                            <TableRow
                                key={id}
                                sx={{
                                    height: '100px',
                                    boxShadow: '0px 2px 8px 0px rgba(0, 0, 0, 0.2)',
                                    borderRadius: '10px'
                                }}>
                                <TableCell sx={{ ...tableCellStyle, pl: 5 }}>
                                    <Link
                                        component={NextLink}
                                        href={`/orders/${id}`}
                                        color="#2EB4FF"
                                        sx={{ textDecoration: 'none' }}
                                    >
                                        #{id}
                                    </Link>
                                </TableCell>

                                <TableCell sx={tableCellStyle}>
                                    {formattedDate}
                                </TableCell>

                                <TableCell sx={tableCellStyle}>
                                    <OrderStateIndicator status={status} />
                                </TableCell>

                                <TableCell sx={tableCellStyle} align="center">
                                    € {totalPrice}
                                </TableCell>
                            </TableRow >
                        )
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default OrdersTable
