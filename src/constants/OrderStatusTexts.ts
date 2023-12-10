import OrderStatus from '@/types/order/OrderStatus.enum'

const ORDER_STATUS_TEXTS: Record<OrderStatus, string> = {
    [OrderStatus.PENDING]: 'In attesa',
    [OrderStatus.IN_CHARGE]: 'In carico',
    [OrderStatus.DELIVERING]: 'In arrivo',
    [OrderStatus.DELIVERED]: 'Consegnato'
}

export default ORDER_STATUS_TEXTS