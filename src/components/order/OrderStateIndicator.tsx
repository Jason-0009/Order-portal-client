import { FC } from 'react'

import { Box, SxProps, Typography } from '@mui/material'

import { SvgIconComponent } from '@mui/icons-material'

import ScheduleIcon from '@mui/icons-material/Schedule'
import HowToRegIcon from '@mui/icons-material/HowToReg'
import LocalShippingIcon from '@mui/icons-material/LocalShipping'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'

import OrderState from '@/types/order/OrderState.enum'

type OrderStateIndicatorProps = {
    state: OrderState
}

const OrderStateIndicator: FC<OrderStateIndicatorProps> = ({ state }) => {
    const styles: Record<OrderState, SxProps> = {
        [OrderState.PENDING]: {
            backgroundColor: '#ABC2FF',
            color: '#4638EC'
        },
        [OrderState.IN_CHARGE]: {
            backgroundColor: '#FFFB9C',
            color: '#CDAF14'
        },
        [OrderState.SHIPPING]: {
            backgroundColor: '#F6BEBA',
            color: '#C62424'
        },
        [OrderState.SHIPPED]: {
            backgroundColor: '#BAF6C0',
            color: '#37811D',
        }
    }

    const icons: Record<OrderState, SvgIconComponent> = {
        [OrderState.PENDING]: ScheduleIcon,
        [OrderState.IN_CHARGE]: HowToRegIcon,
        [OrderState.SHIPPING]: LocalShippingIcon,
        [OrderState.SHIPPED]: CheckCircleIcon,
    }

    const texts: Record<OrderState, string> = {
        [OrderState.PENDING]: 'In attesa',
        [OrderState.IN_CHARGE]: 'In carico',
        [OrderState.SHIPPING]: 'In arrivo',
        [OrderState.SHIPPED]: 'Consegnato'
    }

    const style = styles[state]
    const IconComponent = icons[state]
    const text = texts[state]

    return (
        <Box sx={{
            ...style,
            display: 'flex',
            justifyContent: 'space-between',
            padding: '10px',
            alignItems: 'center',
            borderRadius: '20px',
            width: '140px',
            height: '40px',
            boxShadow: '0px 4px 14px 0px rgba(0, 0, 0, 0.25)'
        }}>
            <IconComponent />

            <Typography variant="body2" sx={{
                display: 'flex',
                justifyContent: 'center',
                flexGrow: 1,
                fontSize: '13px',
                fontWeight: 600
            }}>
                {text}
            </Typography>
        </Box>
    )
}

export default OrderStateIndicator
