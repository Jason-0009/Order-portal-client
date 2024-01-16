import { FC, useState } from 'react'
import { useQuery } from 'react-query'
import { useDispatch } from 'react-redux'

import { useTranslation } from 'next-i18next'
import NextLink from 'next/link'
import { useRouter } from 'next/router'

import { AxiosError } from 'axios'

import { ExpandMore } from '@mui/icons-material'
import {
    Avatar, Box,
    Collapse,
    IconButton,
    Link,
    MenuItem,
    Select,
    SelectChangeEvent,
    SxProps, TableBody,
    TableCell,
    TableRow,
    Typography
} from '@mui/material'

import { showAlert } from '@/slices/dialog/alertDialogSlice'
import { showOrdersSnackbar } from '@/slices/snackbar/ordersSnackbarSlice'

import updateOrderStatus from '@/api/order/updateOrderStatus'
import fetchUser from '@/api/user/fetchUser'

import AlertDialog from '@/components/dialog/AlertDialog'
import AdminOrderDetailsTable from './AdminOrderDetailsTable'

import { formatDistanceToNowLocale } from '@/utils/dateUtils'
import toCamelCase from '@/utils/toCamelCase'

import Order from '@/types/order/Order.type'
import OrderStatus from '@/types/order/OrderStatus.enum'
import StatusPalette from '@/types/palette/StatusPalette.type'

import ORDER_STATUS_STYLES from '@/constants/OrderStatusStyles'
import ORDER_STATUS_TEXT_CODES from '@/constants/OrderStatusTextCodes'

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
    const { data: user } = useQuery(['user', customerId], () => fetchUser(customerId))

    const formattedDate = date && locale && formatDistanceToNowLocale(date, locale)

    const orderStatuses = Object.values(OrderStatus)
    const statusKey = toCamelCase(status)
    
    const isCurrentRowOpen = id && openRows[id]
    const isFirstItem = index === 0
    const isLastItem = index === array.length - 1

    const fontSizeStyle: SxProps = {
        fontSize: { xs: '11px', sm: '12px', md: '13px', lg: '14px' }
    }

    const tableCellStyle: SxProps = {
        ...fontSizeStyle,
        border: 'none',
        color: 'text.secondary',
        pt: isFirstItem ? 4 : 0,
        pb: isLastItem ? 1 : 0
    }

    const selectedStatusStyle = ORDER_STATUS_STYLES[order.status]

    const handleChange = async (event: SelectChangeEvent) => {
        const newStatus = event.target.value as OrderStatus

        const currentIndex = orderStatuses.indexOf(selectedStatus)
        const newIndex = orderStatuses.indexOf(newStatus)

        if (newIndex !== currentIndex + 1) {
            dispatch(showAlert(translation('changeStatus')))

            return
        }

        try {
            if (!id) return

            await updateOrderStatus(id, newStatus)

            setSelectedStatus(newStatus)

            dispatch(showOrdersSnackbar(translation('statusUpdatedSuccessfully')))
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
                        <Avatar src={user?.imageUrl} sx={{
                            width: { xs: 24, sm: 28, md: 32, lg: 40 },
                            height: { xs: 24, sm: 28, md: 32, lg: 40 }
                        }} />

                        <Typography variant="body2" sx={{
                            ...fontSizeStyle,
                            ml: 2
                        }}>
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
                        value={order.status}
                        onChange={handleChange}
                        disabled={status === OrderStatus.DELIVERED}
                        IconComponent={({ className }) => {
                            className = className.replace("MuiSelect-iconOpen", "")

                            return status !== OrderStatus.DELIVERED &&
                                <ExpandMore className={className} sx={theme => ({
                                    fontSize: { xs: '16px', sm: '18px', md: '19px', lg: '20px' },
                                    left: { xs: '85px', md: '90px' },
                                    color: `${(theme.palette.status as StatusPalette)[statusKey]?.text.main} !important`
                                })} />
                        }}
                        sx={theme => ({
                            textAlign: 'center',
                            width: { xs: '130px', md: '140px' },
                            height: { xs: '20px', sm: '21px', md: '23px', lg: '25px' },
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
                            const isFirstItem = index === 0
                            const isLastItem = index === array.length - 1

                            const text = translation(ORDER_STATUS_TEXT_CODES[status])

                            return (
                                <MenuItem
                                    key={status}
                                    value={status}
                                    sx={{
                                        fontSize: { xs: '0.7em', sm: '0.75em', md: '0.8em', lg: '0.85em' },
                                        '&.Mui-selected': {
                                            color: selectedStatusStyle.color,
                                            backgroundColor: selectedStatusStyle.backgroundColor
                                        },
                                        '&.MuiMenuItem-root': {
                                            marginTop: isFirstItem ? { xs: '-0.7em', lg: '-0.6em' } : 'auto',
                                            marginBottom: isLastItem ? { xs: '-0.75em', lg: '-0.6em' } : 'auto',
                                            backgroundColor: 'secondary.main',
                                            '&:hover': {
                                                backgroundColor: 'primary.main'
                                            }
                                        }
                                    }}
                                >
                                    {text}
                                </MenuItem>
                            )
                        })}
                    </Select>
                </TableCell>

                <TableCell sx={tableCellStyle}>
                    <IconButton onClick={onExpand}>
                        <ExpandMore
                            sx={{
                                fontSize: { xs: '0.7em', sm: '0.75em', md: '0.8em', lg: '0.85em' },
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