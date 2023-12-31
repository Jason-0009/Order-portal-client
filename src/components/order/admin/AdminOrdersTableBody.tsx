import { FC, useState } from 'react'
import { useDispatch } from 'react-redux'

import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import { AxiosError } from 'axios'

import {
    SxProps, TableBody, TableRow, TableCell,
    IconButton, Collapse, Select, MenuItem, SelectChangeEvent
} from '@mui/material'
import { ExpandCircleDownOutlined, ExpandMore } from '@mui/icons-material'

import { useOrderStatusTexts } from '@/hooks/useOrderStatusTexts'

import { showAlert } from '@/slices/alertDialogSlice'

import updateOrderStatus from '@/api/order/updateOrderStatus'

import AdminOrderDetailsTable from './AdminOrderDetailsTable'
import AlertDialog from '@/components/dialog/AlertDialog'

import { formatDistanceToNowLocale } from '@/utils/dateUtils'

import Order from '@/types/order/Order.type'
import OrderStatus from '@/types/order/OrderStatus.enum'

import ORDER_STATUS_STYLES from '@/constants/OrderStatusStyles'

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

    const dispatch = useDispatch()

    const [selectedStatus, setSelectedStatus] = useState(status)

    const { locale } = useRouter()

    const { t: translation } = useTranslation()
    const ORDER_STATUS_TEXTS = useOrderStatusTexts()

    const formattedDate = date && locale && formatDistanceToNowLocale(date, locale)

    const orderStatuses = Object.values(OrderStatus)

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

        const currentIndex = orderStatuses.indexOf(selectedStatus)
        const newIndex = orderStatuses.indexOf(newStatus)

        if (newIndex !== currentIndex + 1) {
            dispatch(showAlert(translation('changeStatus')))

            return
        }

        try {
            currentId && await updateOrderStatus(currentId, newStatus)

            setSelectedStatus(newStatus)
        } catch (error: unknown) {
            const { response } = error as AxiosError
            const errorMessage = response?.data as string

            dispatch(showAlert(errorMessage))
        }
    }

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
                                <ExpandMore className={className}
                                    style={{ color: selectedStatusStyle.color }} />
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
                        {orderStatuses.map((status, index, array) => {
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

            <AlertDialog />
        </TableBody >
    )
}

export default AdminOrdersTableBody