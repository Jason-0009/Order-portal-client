import { FC, MouseEvent, useState } from 'react'

import { useTranslation } from 'next-i18next'

import { Locale, enUS, it } from 'date-fns/locale'

import { Clear, DateRange, ExpandMore, FilterList } from '@mui/icons-material'
import { Box, IconButton, List, ListItemButton, Popover, Typography } from '@mui/material'

import { DateCalendar, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3'

import OrderStatus from '@/types/order/OrderStatus.enum'

import ORDER_STATUS_STYLES from '@/constants/OrderStatusStyles'
import ORDER_STATUS_TEXT_CODES from '@/constants/OrderStatusTextCodes'

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

    const { i18n, t: translation } = useTranslation()

    const locales: { [key: string]: Locale } = {
        en: enUS,
        it: it
    }

    const handleCalendarOpen = (event: MouseEvent<HTMLElement>) =>
        setCalendarAnchorElement(event.currentTarget)
    const handleCalendarClose = () => setCalendarAnchorElement(null)

    const handleStatusFilterOpen = (event: MouseEvent<HTMLElement>) =>
        setStatusAnchorElement(event.currentTarget)
    const handleStatusFilterClose = () => setStatusAnchorElement(null)

    const handleClearDateFilter = () => setFilteredDateAndResetPage(null)
    const handleClearStatusFilter = () => setFilteredStatusAndResetPage(null)

    return (
        <Box sx={theme => ({
            display: 'flex',
            alignItems: 'center',
            height: '35px',
            color: 'text.primary',
            backgroundColor: 'secondary.main',
            p: 1,
            mt: { xs: 1, sm: 0 },
            borderRadius: '10px',
            boxShadow: `0px 2px 8px 0px ${theme.palette.secondary.main}`
        })}>
            <DateRange sx={{ fontSize: '0.95em' }} />

            <Typography variant="body1" sx={{
                ml: 0.5,
                fontSize: { xs: '0.65em', sm: '0.75em', md: '0.8em', lg: '0.85em' }
            }}>
                {translation('sortByDate')}
            </Typography>

            <IconButton onClick={handleCalendarOpen} sx={{ p: 0.2 }}>
                <ExpandMore sx={{ fontSize: '0.7em' }} />
            </IconButton>

            <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={locales[i18n.language]}>
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
                        sx={{ backgroundColor: 'secondary.main' }}
                    />
                </Popover>
            </LocalizationProvider>

            {filteredDate && <IconButton
                onClick={handleClearDateFilter}
                sx={{ p: 0.2, color: 'primary.main' }}
            >
                <Clear sx={{ fontSize: '0.7em', color: 'red' }} />
            </IconButton>}

            <FilterList sx={{ ml: 1, fontSize: '0.95em' }} />

            <Typography variant="body1" sx={{
                ml: 0.5,
                fontSize: { xs: '0.65em', sm: '0.75em', md: '0.8em', lg: '0.85em' }
            }}>
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

                        const text = translation(ORDER_STATUS_TEXT_CODES[status])

                        return (
                            <ListItemButton
                                key={status}
                                onClick={() => setFilteredStatusAndResetPage(status)}
                                sx={{
                                    fontSize: { xs: '0.8em', sm: '0.9em', md: '0.95em', lg: '1em' },
                                    backgroundColor: filteredStatus === status ?
                                        selectedStatusStyle.backgroundColor : 'secondary.main',
                                    color: filteredStatus === status ?
                                        selectedStatusStyle.color : 'text.main',
                                    '&.MuiListItemButton-root': {
                                        paddingTop: isFirstItem ? '0.6em' : 'auto',
                                        paddingBottom: isLastItem ? '0.6em' : 'auto'
                                    }
                                }}
                            >
                                {text}
                            </ListItemButton>
                        )
                    })}
                </List>
            </Popover>

            {filteredStatus && <IconButton
                onClick={handleClearStatusFilter}
                sx={{ p: 0.2, color: 'primary.main' }}
            >
                <Clear sx={{ fontSize: '0.7em', color: 'red' }} />
            </IconButton>}
        </Box>
    )
}

export default OrdersFilter
