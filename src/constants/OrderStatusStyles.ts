import { SxProps } from '@mui/material'

import OrderStatus from '@/types/order/OrderStatus.enum'

type OrderStatusStyle = SxProps & {
    backgroundColor: string,
    color: string
}

const ORDER_STATUS_STYLES: Record<OrderStatus, OrderStatusStyle> = {
    [OrderStatus.PENDING]: {
        backgroundColor: '#ABC2FF',
        color: '#4638EC'
    },
    [OrderStatus.IN_CHARGE]: {
        backgroundColor: '#FFFB9C',
        color: '#CDAF14'
    },
    [OrderStatus.DELIVERING]: {
        backgroundColor: '#F6BEBA',
        color: '#C62424'
    },
    [OrderStatus.DELIVERED]: {
        backgroundColor: '#BAF6C0',
        color: '#37811D',
    }
}

export default ORDER_STATUS_STYLES