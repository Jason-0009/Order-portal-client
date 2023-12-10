import { FC, useState, MouseEvent } from 'react'

import { Box, Typography, IconButton, Popover, List, ListItemButton } from '@mui/material'

import { Clear, DateRange, ExpandMore, FilterList } from '@mui/icons-material'

import { LocalizationProvider, DateCalendar } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'

import OrderStatus from '@/types/order/OrderStatus.enum'

import ORDER_STATUS_TEXTS from '@/constants/OrderStatusTexts'
import ORDER_STATUS_STYLES from '@/constants/OrderStatusStyles'

type OrderFilterProps = {
    filteredDate: Date | null,
    setFilteredDate: (date: Date | null) => void,
    filteredStatus: OrderStatus | null,
    setFilteredStatus: (status: OrderStatus | null) => void
}

const OrdersFilter: FC<OrderFilterProps> = ({ filteredDate, setFilteredDate, filteredStatus, setFilteredStatus }) => {
    const [calendarAnchorElement, setCalendarAnchorElement] = useState<HTMLElement>()
    const [statusAnchorElement, setStatusAnchorElement] = useState<HTMLElement>()

    const possibleOrderStatuses = Object.values(OrderStatus)

    const handleCalendarOpen = ({ currentTarget }: MouseEvent<HTMLElement>) => setCalendarAnchorElement(currentTarget)
    const handleCalendarClose = () => setCalendarAnchorElement(undefined)
    
    const handleStatusFilterOpen = ({ currentTarget }: MouseEvent<HTMLElement>) => setStatusAnchorElement(currentTarget)
    const handleStatusFilterClose = () => setStatusAnchorElement(undefined)

    const handleClearDateFilter = () => setFilteredDate(null)
    const handleClearStatusFilter = () => setFilteredStatus(null)

    return (
        <Box sx={{
            display: 'flex',
            alignItems: 'center',
            width: 'fit-content',
            height: '40px',
            color: '#948E8E',
            p: 1,
            boxShadow: '0px 2px 8px 0px rgba(0, 0, 0, 0.2)',
            borderRadius: '10px'
        }}>
            <DateRange sx={{ fontSize: '0.95em' }} />

            <Typography variant="body1" sx={{ ml: 0.5, fontSize: '0.85em' }}>
                Ordina per data
            </Typography>

            <IconButton onClick={handleCalendarOpen} sx={{ p: 0.2 }}>
                <ExpandMore sx={{ fontSize: '0.7em' }} />
            </IconButton>

            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Popover
                    open={Boolean(calendarAnchorElement)}
                    anchorEl={calendarAnchorElement}
                    onClose={handleCalendarClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                >
                    <DateCalendar
                        value={filteredDate}
                        onChange={date => setFilteredDate(date)}
                    />
                </Popover>
            </LocalizationProvider>

            {filteredDate && <IconButton
                onClick={handleClearDateFilter}
                sx={{ p: 0.2, color: 'primary.main' }}
            >
                <Clear sx={{ fontSize: '0.7em' }} />
            </IconButton>}

            <FilterList sx={{ ml: 1, fontSize: '0.95em' }} />

            <Typography variant="body1" sx={{ ml: 0.5, fontSize: '0.85em' }}>
                Ordina per stato
            </Typography>

            <IconButton onClick={handleStatusFilterOpen} sx={{ p: 0.2 }}>
                <ExpandMore sx={{ fontSize: '0.7em' }} />
            </IconButton>

            <Popover
                open={Boolean(statusAnchorElement)}
                anchorEl={statusAnchorElement}
                onClose={handleStatusFilterClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                <List sx={{ fontSize: '0.85em', py: 0 }}>
                    {possibleOrderStatuses.map((status, index, array) => {
                        const isFirstItem = index === 0
                        const isLastItem = index === array.length - 1

                        const selectedStatusStyle = ORDER_STATUS_STYLES[status]

                        return (
                            <ListItemButton
                                key={status}
                                onClick={() => setFilteredStatus(status)}
                                sx={{
                                    backgroundColor: filteredStatus === status ? selectedStatusStyle.backgroundColor : undefined,
                                    color: filteredStatus === status ? selectedStatusStyle.color : undefined,
                                    '&.MuiListItemButton-root': {
                                        paddingTop: isFirstItem ? '0.6em' : 'auto',
                                        paddingBottom: isLastItem ? '0.6em' : 'auto'
                                    }
                                }}
                            >
                                {ORDER_STATUS_TEXTS[status]}
                            </ListItemButton>
                        )
                    })}
                </List>
            </Popover>

            {filteredStatus && <IconButton
                onClick={handleClearStatusFilter}
                sx={{ p: 0.2, color: 'primary.main' }}
            >
                <Clear sx={{ fontSize: '0.7em' }} />
            </IconButton>}
        </Box>
    )
}

export default OrdersFilter
