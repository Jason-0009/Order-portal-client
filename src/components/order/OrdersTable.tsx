import { FC } from 'react'

import { useTranslation } from 'next-i18next'
import NextLink from 'next/link'
import { useRouter } from 'next/router'

import {
    Link, SxProps, Table, TableBody,
    TableCell, TableContainer,
    TableHead, TableRow
} from '@mui/material'

import OrderStatusIndicator from './OrderStatusIndicator'

import { formatDateLocale } from '@/utils/dateUtils'

import Order from '@/types/order/Order.type'

type OrdersTableProps = {
    orders: Order[]
}

const OrdersTable: FC<OrdersTableProps> = ({ orders }) => {
    const { locale } = useRouter()
    const { t: translation } = useTranslation()

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
                        <TableCell sx={{
                            ...tableCellStyle,
                            width: '25%',
                            pl: 4
                        }}
                        >
                            Id
                        </TableCell>

                        <TableCell sx={{ ...tableCellStyle, width: '15%' }}>
                            {translation('dateLabel')}
                        </TableCell>

                        <TableCell sx={{ ...tableCellStyle, width: '10%' }}>
                            {translation('totalLabel')}
                        </TableCell>

                        <TableCell sx={tableCellStyle}>
                            {translation('statusLabel')}
                        </TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {orders.map((order, index, array) => {
                        const { id, date, status, totalPrice } = order

                        const isFirstItem = index === 0
                        const isLastItem = index === array.length - 1

                        const formattedDate = date && locale && formatDateLocale(date, locale)
                        const tableCellStyle: SxProps = {
                            borderBottom: 'none',
                            color: 'text.secondary',
                            pt: isFirstItem ? 4 : 2,
                            pb: isLastItem ? 4 : 2,
                            fontSize: { xs: '11px', sm: '12px', md: '13px', lg: '14px' }
                        }

                        return (
                            <TableRow key={id}>
                                <TableCell sx={{ ...tableCellStyle, pl: 4 }}>
                                    <Link
                                        component={NextLink}
                                        href={`/orders/${id}`}
                                        color='link.main'
                                        sx={{ textDecoration: 'none' }}
                                    >
                                        #{id}
                                    </Link>
                                </TableCell>

                                <TableCell sx={tableCellStyle}>
                                    {formattedDate}
                                </TableCell>

                                <TableCell sx={tableCellStyle}>
                                    € {totalPrice}
                                </TableCell>

                                <TableCell sx={tableCellStyle}>
                                    <OrderStatusIndicator status={status} size='regular' />
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
