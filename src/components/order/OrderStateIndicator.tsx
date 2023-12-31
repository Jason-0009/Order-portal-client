import { FC } from 'react'

import { Box, Typography } from '@mui/material'
import {
    SvgIconComponent, Schedule,
    HowToReg, LocalShipping, CheckCircle
} from '@mui/icons-material'

import { useOrderStatusTexts } from '@/hooks/useOrderStatusTexts'

import OrderStatus from '@/types/order/OrderStatus.enum'

import ORDER_STATUS_STYLES from '@/constants/OrderStatusStyles'

type OrderStateIndicatorProps = {
    status: OrderStatus
}

const OrderStateIndicator: FC<OrderStateIndicatorProps> = ({ status }) => {
    const ORDER_STATUS_TEXTS = useOrderStatusTexts()
    
    const icons: Record<OrderStatus, SvgIconComponent> = {
        [OrderStatus.PENDING]: Schedule,
        [OrderStatus.IN_CHARGE]: HowToReg,
        [OrderStatus.DELIVERING]: LocalShipping,
        [OrderStatus.DELIVERED]: CheckCircle,
    }

    const style = ORDER_STATUS_STYLES[status]
    const IconComponent = icons[status]
    const text = ORDER_STATUS_TEXTS[status]

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
