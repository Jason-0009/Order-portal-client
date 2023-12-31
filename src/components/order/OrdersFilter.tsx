import { FC, useState, MouseEvent } from 'react'

import { useTranslation } from 'next-i18next'

import { Box, Typography, IconButton, Popover, List, ListItemButton } from '@mui/material'
import { Clear, DateRange, ExpandMore, FilterList } from '@mui/icons-material'

import { LocalizationProvider, DateCalendar } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'

import { useOrderStatusTexts } from '@/hooks/useOrderStatusTexts'

import OrderStatus from '@/types/order/OrderStatus.enum'

import ORDER_STATUS_STYLES from '@/constants/OrderStatusStyles'

type OrderFilterProps = {
    filteredDate: Date | null,
    setFilteredDateAndResetPage: (date: Date | null) => void,
    filteredStatus: OrderStatus | null,
    setFilteredStatusAndResetPage: (status: OrderStatus | null) => void
}

const OrdersFilter: FC<OrderFilterProps> = ({
    filteredDate,
    setFilteredDateAndResetPage: setFilteredDateAndResetPage,
    filteredStatus,
    setFilteredStatusAndResetPage: setFilteredStatusAndResetPage
}) => {
    const [calendarAnchorElement, setCalendarAnchorElement] = useState<HTMLElement | null>(null)
    const [statusAnchorElement, setStatusAnchorElement] = useState<HTMLElement | null>(null)

    const { t: translation } = useTranslation()
    const ORDER_STATUS_TEXTS = useOrderStatusTexts()

    const handleCalendarOpen = (event: MouseEvent<HTMLElement>) =>
        setCalendarAnchorElement(event.currentTarget)
    const handleCalendarClose = () => setCalendarAnchorElement(null)

    const handleStatusFilterOpen = (event: MouseEvent<HTMLElement>) =>
        setStatusAnchorElement(event.currentTarget)
    const handleStatusFilterClose = () => setStatusAnchorElement(null)

    const handleClearDateFilter = () => setFilteredDateAndResetPage(null)
    const handleClearStatusFilter = () => setFilteredStatusAndResetPage(null)

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
                {translation('sortByDate')}
            </Typography>

            <IconButton onClick={handleCalendarOpen} sx={{ p: 0.2 }}>
                <ExpandMore sx={{ fontSize: '0.7em' }} />
            </IconButton>

            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Popover
                    open={!!calendarAnchorElement}
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
                        onChange={date => setFilteredDateAndResetPage(date)}
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
                {translation('sortByStatus')}
            </Typography>

            <IconButton onClick={handleStatusFilterOpen} sx={{ p: 0.2 }}>
                <ExpandMore sx={{ fontSize: '0.7em' }} />
            </IconButton>

            <Popover
                open={!!statusAnchorElement}
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
                    {Object.values(OrderStatus).map((status, index, array) => {
                        const isFirstItem = index === 0
                        const isLastItem = index === array.length - 1

                        const selectedStatusStyle = ORDER_STATUS_STYLES[status]

                        return (
                            <ListItemButton
                                key={status}
                                onClick={() => setFilteredStatusAndResetPage(status)}
                                sx={{
                                    backgroundColor: filteredStatus === status ? selectedStatusStyle.backgroundColor : undefined,
                                    color: filteredStatus === status ? selectedStatusStyle.color : 'initial',
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
