import { FC, useState } from 'react'

import { QueryObserverResult } from 'react-query'

import { AxiosError } from 'axios'

import {
    SxProps, TableBody, TableRow, TableCell,
    IconButton, Collapse, Select, MenuItem,
    SelectChangeEvent, Dialog, DialogTitle,
    DialogActions, DialogContent, DialogContentText,
    Button
} from '@mui/material'

import { ExpandCircleDownOutlined, ExpandMore, Error } from '@mui/icons-material'

import { formatDistanceToNow } from 'date-fns'
import { it } from 'date-fns/locale'

import updateOrderStatus from '@/api/order/updateOrderStatus'

import useOrders from '@/hooks/useOrders'
import useStatistics from '@/hooks/useStatistics'

import AdminOrderDetailsTable from './AdminOrderDetailsTable'

import Order from '@/types/order/Order.type'
import OrderStatus from '@/types/order/OrderStatus.enum'

import ORDER_STATUS_STYLES from '@/constants/OrderStatusStyles'
import ORDER_STATUS_TEXTS from '@/constants/OrderStatusTexts'

type AdminOrdersTableBodyProps = {
    order: Order,
    openRows: Record<string, boolean>,
    previousRowId: string | undefined,
    nextRowId: string | undefined,
    index: number,
    ordersLength: number,
    onExpand: () => void
}

const AdminOrdersTableBody: FC<AdminOrdersTableBodyProps> = ({
    order,
    openRows,
    previousRowId,
    nextRowId,
    index,
    ordersLength,
    onExpand
}) => {
    const { id: currentId, date, totalPrice, status } = order

    const [selectedStatus, setSelectedStatus] = useState(status)
    const [isErrorDialogOpen, setIsErrorDialogOpen] = useState(false)
    const [errorDialogMessage, setErrorDialogMessage] = useState('')

    const { refetch: refetchOrders } = useOrders()
    const { refetch: refetchStatistics } = useStatistics()

    const formattedDate = date && formatDistanceToNow(new Date(date), { addSuffix: true, locale: it })

    const possibleOrderStatuses = Object.values(OrderStatus)

    const isCurrentRowOpen = currentId && openRows[currentId]
    const isPreviousRowOpen = previousRowId && openRows[previousRowId]
    const isNextRowOpen = nextRowId && openRows[nextRowId]

    const isFirstRow = index === 0
    const isLastRow = index === ordersLength - 1

    const tableCellStyle: SxProps = {
        border: isCurrentRowOpen || isNextRowOpen || isLastRow ? 'none' : 'default',
        pt: isCurrentRowOpen ? 3 : isFirstRow || isPreviousRowOpen ? 1 : 0,
        pb: 2
    }

    const selectedStatusStyle = ORDER_STATUS_STYLES[selectedStatus]

    const handleChange = async (event: SelectChangeEvent) => {
        const newStatus = event.target.value as OrderStatus

        const currentIndex = possibleOrderStatuses.indexOf(selectedStatus)
        const newIndex = possibleOrderStatuses.indexOf(newStatus)

        if (newIndex !== currentIndex + 1) {
            setErrorDialogMessage('Puoi cambiare lo stato solo al successivo nella sequenza.')
            setIsErrorDialogOpen(true)

            return
        }

        try {
            currentId && await updateOrderStatus(currentId, newStatus)

            setSelectedStatus(newStatus)

            refetchOrders()
            refetchStatistics()
        } catch (error: unknown) {
            const { response } = error as AxiosError
            const errorMessage = response?.data as string

            setErrorDialogMessage(errorMessage)
            setIsErrorDialogOpen(true)
        }
    }

    const handleCloseErrorDialog = () => setIsErrorDialogOpen(false)

    return (
        <TableBody sx={{
            boxShadow: isCurrentRowOpen ? '0px 0px 2px 0px rgba(0, 0, 0, 0.25)' : 'none',
            borderRadius: '20px'
        }}>
            <TableRow>
                <TableCell sx={tableCellStyle}>
                    {currentId}
                </TableCell>

                <TableCell sx={tableCellStyle}>
                    {formattedDate}
                </TableCell>

                <TableCell sx={tableCellStyle}>
                    € {totalPrice}
                </TableCell>

                <TableCell sx={tableCellStyle} align="center">
                    <Select
                        value={selectedStatus}
                        onChange={handleChange}
                        disabled={status === OrderStatus.DELIVERED}
                        IconComponent={({ className }) => {
                            className = className.replace("MuiSelect-iconOpen", "")

                            return status !== OrderStatus.DELIVERED &&
                                <ExpandMore className={className} style={{ color: selectedStatusStyle.color }} />
                        }}
                        sx={{
                            ...selectedStatusStyle,
                            display: 'flex',
                            alignItems: 'center',
                            width: '140px',
                            height: '35px',
                            borderRadius: '20px',
                            fontSize: '0.95em',
                            '.MuiOutlinedInput-notchedOutline': {
                                borderColor: 'transparent',
                            },
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                borderColor: selectedStatusStyle.color,
                            },
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                border: `1px solid ${selectedStatusStyle.color}`,
                            },
                            '&.Mui-disabled .MuiOutlinedInput-input': {
                                color: selectedStatusStyle.color,
                                WebkitTextFillColor: 'initial',
                                pl: 4,
                                '.MuiOutlinedInput-notchedOutline': {
                                    borderColor: 'transparent',
                                    '&:hover': {
                                        borderColor: selectedStatusStyle.color
                                    }
                                }
                            }
                        }}
                    >
                        {possibleOrderStatuses.map((status, index, array) => {
                            const statusStyle = ORDER_STATUS_STYLES[status]

                            const isFirstItem = index === 0
                            const isLastItem = index === array.length - 1

                            return (
                                <MenuItem
                                    key={status}
                                    value={status}
                                    sx={{
                                        fontSize: '0.85em',
                                        '&.Mui-selected': {
                                            backgroundColor: `${statusStyle.backgroundColor} !important`
                                        },
                                        '&.MuiMenuItem-root': {
                                            marginTop: isFirstItem ? '-0.6em' : 'auto',
                                            marginBottom: isLastItem ? '-0.6em' : 'auto'
                                        }
                                    }}
                                >
                                    {ORDER_STATUS_TEXTS[status]}
                                </MenuItem>
                            )
                        })}
                    </Select>
                </TableCell>

                <TableCell sx={tableCellStyle} align="right">
                    <IconButton onClick={onExpand}>
                        <ExpandCircleDownOutlined
                            sx={{
                                color: isCurrentRowOpen ? '#5970E9' : '#BEBEBE',
                                transform: isCurrentRowOpen ? 'rotate(180deg)' : 'none',
                            }}
                        />
                    </IconButton>
                </TableCell>
            </TableRow>

            <TableRow >
                <TableCell sx={{ borderBottom: 'none', py: 0 }} colSpan={6}>
                    <Collapse in={!!isCurrentRowOpen} timeout="auto" unmountOnExit>
                        <AdminOrderDetailsTable order={order} />
                    </Collapse>
                </TableCell>
            </TableRow>

            <Dialog open={isErrorDialogOpen} onClose={handleCloseErrorDialog} PaperProps={{
                sx: {
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '10px',
                    p: 1
                }
            }}>
                <DialogTitle sx={{
                    display: 'flex',
                    alignItems: 'center',
                    fontWeight: 600,
                    mb: 1
                }}>
                    <Error color="error" sx={{ mr: 1 }} />

                    Si è verificato un errore
                </DialogTitle>

                <DialogContent>
                    <DialogContentText>
                        {errorDialogMessage}
                    </DialogContentText>
                </DialogContent>

                <DialogActions sx={{ justifyContent: 'center' }}>
                    <Button onClick={handleCloseErrorDialog} color="primary" autoFocus>
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
        </TableBody >
    )
}

export default AdminOrdersTableBody