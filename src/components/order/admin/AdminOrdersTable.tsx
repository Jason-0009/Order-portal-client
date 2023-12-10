import { FC, useState } from 'react'

import { QueryObserverResult } from 'react-query'

import {
    SxProps, Table, TableHead, TableRow,
    TableCell, TableContainer
} from '@mui/material'

import AdminOrdersTableBody from './AdminOrdersTableBody'

import Order from '@/types/order/Order.type'

type AdminOrdersTableProps = {
    orders: Order[]
}

const AdminOrdersTable: FC<AdminOrdersTableProps> = ({ orders }) => {
    const [openRows, setOpenRows] = useState<Record<string, boolean>>({})

    const firstOrderId = orders[0].id
    const isFirstRowOpen = firstOrderId && openRows[firstOrderId]

    const tableCellStyle: SxProps = {
        color: '#BEBEBE',
        border: isFirstRowOpen ? 'none' : 'default'
    }

    const toggleRow = (id: string) => setOpenRows(previousOpenRows => ({ ...previousOpenRows, [id]: !previousOpenRows[id] }))

    return (
        <TableContainer sx={{ p: 1 }}>
            <Table sx={{
                borderCollapse: 'separate',
                borderSpacing: '0px 10px',
            }}>
                <TableHead>
                    <TableRow>
                        <TableCell sx={tableCellStyle}>
                            Id
                        </TableCell>

                        <TableCell sx={tableCellStyle}>
                            Creato
                        </TableCell>

                        <TableCell sx={tableCellStyle}>
                            Totale
                        </TableCell>

                        <TableCell sx={tableCellStyle}>
                            Stato
                        </TableCell>

                        <TableCell sx={tableCellStyle} align="right" />
                    </TableRow>
                </TableHead>

                {orders.map((order, index) => {
                    const { id: currentId } = order
                    const previousRowId = orders[index - 1]?.id
                    const nextRowId = orders[index + 1]?.id

                    return (
                        <AdminOrdersTableBody
                            key={currentId}
                            order={order}
                            openRows={openRows}
                            previousRowId={previousRowId}
                            nextRowId={nextRowId}
                            onExpand={() => currentId && toggleRow(currentId)}
                            index={index}
                            ordersLength={orders.length}
                        />
                    )
                })}
            </Table>
        </TableContainer >
    )
}

export default AdminOrdersTable