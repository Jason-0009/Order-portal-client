import OrderStatus from '@/types/order/OrderStatus.enum'

const ORDER_STATUS_TEXT_CODES = {
    [OrderStatus.PENDING]: 'statusPending',
    [OrderStatus.IN_CHARGE]: 'statusInCharge',
    [OrderStatus.DELIVERING]: 'statusDelivering',
    [OrderStatus.DELIVERED]: 'statusDelivered'
}

export default ORDER_STATUS_TEXT_CODES