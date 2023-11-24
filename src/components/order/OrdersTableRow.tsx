import { FC } from 'react'

import NextLink from 'next/link'

import { Link, SxProps, TableCell, TableRow } from '@mui/material'

import OrderStateIndicator from './OrderStateIndicator'

import { formatDate } from '@/utils/dateUtils'

import Order from '@/types/order/Order.type'

type OrdersTableRowProps = {
    order: Order
}

const OrdersTableRow: FC<OrdersTableRowProps> = ({ order }) => {
    const { id, date, state, totalPrice } = order
    const formattedDate = formatDate(date as string)
    const tableCellStyle: SxProps = { borderBottom: 'none', fontWeight: 600 }

    return (
        <TableRow sx={{
            height: '100px',
            boxShadow: '0px 2px 8px 0px rgba(0, 0, 0, 0.2)',
            borderRadius: '10px'
        }}>
            <TableCell sx={tableCellStyle}>
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
                <OrderStateIndicator state={state} />
            </TableCell>

            <TableCell sx={tableCellStyle}>
                € {totalPrice}
            </TableCell>
        </TableRow >
    )
}

export default OrdersTableRow
