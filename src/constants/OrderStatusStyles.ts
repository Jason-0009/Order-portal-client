import { SxProps } from '@mui/material'

import OrderStatus from '@/types/order/OrderStatus.enum'

type OrderStatusStyle = SxProps & {
    backgroundColor: string,
    color: string
}

const ORDER_STATUS_STYLES: Record<OrderStatus, OrderStatusStyle> = {
    [OrderStatus.PENDING]: {
        backgroundColor: 'status.pending.background.main',
        color: 'status.pending.text.main'
    },
    [OrderStatus.IN_CHARGE]: {
        backgroundColor: 'status.inCharge.background.main',
        color: 'status.inCharge.text.main'
    },
    [OrderStatus.DELIVERING]: {
        backgroundColor: 'status.delivering.background.main',
        color: 'status.delivering.text.main'
    },
    [OrderStatus.DELIVERED]: {
        backgroundColor: 'status.delivered.background.main',
        color: 'status.delivered.text.main',
    }
}

export default ORDER_STATUS_STYLES