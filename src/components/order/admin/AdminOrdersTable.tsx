import { FC, useState } from 'react'

import { useTranslation } from 'next-i18next'

import {
    SxProps, Table, TableHead, TableRow,
    TableCell, TableContainer, Paper
} from '@mui/material'

import AdminOrdersTableBody from './AdminOrdersTableBody'

import Order from '@/types/order/Order.type'

type AdminOrdersTableProps = {
    orders: Order[]
}

const AdminOrdersTable: FC<AdminOrdersTableProps> = ({ orders }) => {
    const [openRows, setOpenRows] = useState<Record<string, boolean>>({})

    const { t: translation } = useTranslation()

    const tableCellStyle: SxProps = {
        color: 'text.primary',
        fontWeight: 600,
        pt: 3
    }

    const toggleRow = (id: string) => setOpenRows(previousOpenRows =>
        ({ ...previousOpenRows, [id]: !previousOpenRows[id] }))

    return (
        <TableContainer>
            <Table sx={{
                backgroundColor: 'secondary.main',
                borderRadius: '20px',
                mt: 4
            }}>
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ ...tableCellStyle, width: '25%', pl: 5 }}>
                            Id
                        </TableCell>

                        <TableCell sx={{ ...tableCellStyle, width: '20%' }}>
                            {translation('customerLabel')}
                        </TableCell>

                        <TableCell sx={{ ...tableCellStyle, width: '15%' }}>
                            {translation('dateLabel')}
                        </TableCell>

                        <TableCell sx={{ ...tableCellStyle, width: '10%' }}>
                            {translation('totalLabel')}
                        </TableCell>

                        <TableCell sx={{ ...tableCellStyle, width: '15%' }}>
                            {translation('statusLabel')}
                        </TableCell>

                        <TableCell sx={tableCellStyle} />
                    </TableRow>
                </TableHead>

                {orders.map((order, index, array) => {
                    const { id } = order

                    return (
                        <AdminOrdersTableBody
                            key={id}
                            order={order}
                            openRows={openRows}
                            index={index}
                            array={array}
                            onExpand={() => id && toggleRow(id)}
                        />
                    )
                })}
            </Table>
        </TableContainer >
    )
}

export default AdminOrdersTable