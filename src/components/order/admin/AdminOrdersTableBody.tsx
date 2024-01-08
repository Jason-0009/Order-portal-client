import { FC, useState } from 'react'
import { useDispatch } from 'react-redux'

import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import NextLink from 'next/link'

import { AxiosError } from 'axios'

import {
    SxProps, TableBody, TableRow, TableCell,
    IconButton, Collapse, Select, MenuItem,
    SelectChangeEvent, Link, Typography, Avatar, Box
} from '@mui/material'
import { ExpandMore } from '@mui/icons-material'

import useUser from '@/hooks/user/useUser'
import { useOrderStatusTexts } from '@/hooks/useOrderStatusTexts'

import { showAlert } from '@/slices/dialog/alertDialogSlice'

import updateOrderStatus from '@/api/order/updateOrderStatus'

import AdminOrderDetailsTable from './AdminOrderDetailsTable'
import AlertDialog from '@/components/dialog/AlertDialog'

import { formatDistanceToNowLocale } from '@/utils/dateUtils'
import toCamelCase from '@/utils/toCamelCase'

import Order from '@/types/order/Order.type'
import OrderStatus from '@/types/order/OrderStatus.enum'
import StatusPalette from '@/types/palette/StatusPalette.type'

import ORDER_STATUS_STYLES from '@/constants/OrderStatusStyles'
import { showSnackbar } from '@/slices/snackbarSlice'

type AdminOrdersTableBodyProps = {
    order: Order,
    openRows: Record<string, boolean>,
    index: number,
    array: Order[],
    onExpand: () => void
}

const AdminOrdersTableBody: FC<AdminOrdersTableBodyProps> = ({
    order,
    openRows,
    index,
    array,
    onExpand
}) => {
    const { id, customerId, date, totalPrice, status } = order

    const dispatch = useDispatch()
    const [selectedStatus, setSelectedStatus] = useState(status)
    const { locale } = useRouter()
    const { t: translation } = useTranslation()

    const user = customerId ? useUser(customerId) : null
    const ORDER_STATUS_TEXTS = useOrderStatusTexts()

    const formattedDate = date && locale && formatDistanceToNowLocale(date, locale)
    const orderStatuses = Object.values(OrderStatus)

    const isCurrentRowOpen = id && openRows[id]
    const statusKey = toCamelCase(status)

    const isFirstItem = index === 0
    const isLastItem = index === array.length - 1

    const tableCellStyle: SxProps = {
        border: 'none',
        color: 'text.secondary',
        pt: isFirstItem ? 4 : 0,
        pb: isLastItem ? 1 : 0
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
            id && await updateOrderStatus(id, newStatus)

            setSelectedStatus(newStatus)

            dispatch(showSnackbar(translation('statusUpdatedSuccessfully')))
        } catch (error: unknown) {
            const { response } = error as AxiosError
            const errorMessage = translation(response?.data as string)

            dispatch(showAlert(errorMessage))
        }
    }

    return (
        <TableBody>
            <TableRow>
                <TableCell sx={tableCellStyle}>
                    <Link
                        component={NextLink}
                        href={`/orders/${id}`}
                        color='link.main'
                        sx={{ pl: 4, textDecoration: 'none' }}
                    >
                        #{id}
                    </Link>
                </TableCell>

                <TableCell sx={tableCellStyle}>
                    <Box display='flex' alignItems='center'>
                        <Avatar src={user?.imageUrl} />

                        <Typography variant="body2" marginLeft={2}>
                            {user?.name}
                        </Typography>
                    </Box>
                </TableCell>

                <TableCell sx={tableCellStyle}>
                    {formattedDate}
                </TableCell>

                <TableCell sx={tableCellStyle}>
                    € {totalPrice}
                </TableCell>

                <TableCell sx={tableCellStyle}>
                    <Select
                        value={selectedStatus}
                        onChange={handleChange}
                        disabled={status === OrderStatus.DELIVERED}
                        disableUnderline
                        IconComponent={({ className }) => {
                            className = className.replace("MuiSelect-iconOpen", "")

                            return status !== OrderStatus.DELIVERED &&
                                <ExpandMore className={className} sx={theme => ({
                                    fontSize: '20px',
                                    left: '90px',
                                    color: `${(theme.palette.status as StatusPalette)[statusKey]?.text.main} !important`
                                })} />
                        }}
                        sx={theme => ({
                            textAlign: 'center',
                            width: '140px',
                            height: '25px',
                            borderRadius: '20px',
                            fontSize: '0.95em',
                            fontWeight: 600,
                            pl: status === OrderStatus.DELIVERED ? 2 : 0,
                            color: selectedStatusStyle.color,
                            backgroundColor: selectedStatusStyle.backgroundColor,
                            boxShadow: `0 0 10px ${(theme.palette.status as StatusPalette)[statusKey]?.background.main} !important`,
                            "& fieldset": {
                                border: "none",
                            }
                        })}
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
                                            color: statusStyle.color,
                                            backgroundColor: statusStyle.backgroundColor
                                        },
                                        '&.MuiMenuItem-root': {
                                            marginTop: isFirstItem ? '-0.6em' : 'auto',
                                            marginBottom: isLastItem ? '-0.6em' : 'auto',
                                            backgroundColor: 'secondary.main',
                                            '&:hover': {
                                                backgroundColor: 'primary.main'
                                            }
                                        }
                                    }}
                                >
                                    {ORDER_STATUS_TEXTS[status]}
                                </MenuItem>
                            )
                        })}
                    </Select>
                </TableCell>

                <TableCell sx={tableCellStyle}>
                    <IconButton onClick={onExpand}>
                        <ExpandMore
                            sx={{
                                color: isCurrentRowOpen ? 'text.primary' : 'text.secondary',
                                transform: isCurrentRowOpen ? 'rotate(180deg)' : 'none',
                            }}
                        />
                    </IconButton>
                </TableCell>
            </TableRow>

            <TableRow >
                <TableCell sx={{ borderBottom: 'none' }} colSpan={6}>
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