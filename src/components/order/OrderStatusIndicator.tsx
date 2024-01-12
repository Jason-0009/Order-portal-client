import { FC } from 'react'

import { useTranslation } from 'next-i18next'

import { Box, Typography } from '@mui/material'

import getOrderStatusTexts from '@/utils/getOrderStatusTexts'
import toCamelCase from '@/utils/toCamelCase'

import OrderStatus from '@/types/order/OrderStatus.enum'
import StatusPalette from '@/types/palette/StatusPalette.type'

import ORDER_STATUS_STYLES from '@/constants/OrderStatusStyles'



type OrderStateIndicatorProps = {
    status: OrderStatus,
    size: 'regular' | 'small'
}

const OrderStatusIndicator: FC<OrderStateIndicatorProps> = ({ status, size }) => {
    const { t: translation } = useTranslation()
    
    const ORDER_STATUS_TEXTS = getOrderStatusTexts(translation)

    const style = ORDER_STATUS_STYLES[status]
    const text = ORDER_STATUS_TEXTS[status]

    const isSmall = size === 'small'
    const width = isSmall ? '90px' : '100px'
    const height = isSmall ? '20px' : '25px'
    const fontSize = isSmall ? '12px' : '13px'

    const statusKey = toCamelCase(status)

    return (
        <Box sx={theme => ({
            display: 'flex',
            justifyContent: 'space-between',
            padding: '10px',
            alignItems: 'center',
            borderRadius: '20px',
            width,
            height,
            color: style.color,
            backgroundColor: style.backgroundColor,
            boxShadow: `0px 0px 10px 0px ${(theme.palette.status as StatusPalette)[statusKey]?.background.main}`
        })}>
            <Typography sx={{
                display: 'flex',
                justifyContent: 'center',
                flexGrow: 1,
                fontSize,
                fontWeight: 600
            }}>
                {text}
            </Typography>
        </Box>
    )
}

export default OrderStatusIndicator
