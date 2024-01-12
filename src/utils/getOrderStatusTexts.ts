import OrderStatus from '@/types/order/OrderStatus.enum'

const getOrderStatusTexts = (translation: (key: string) => string) => {
    return {
        [OrderStatus.PENDING]: translation('statusPending'),
        [OrderStatus.IN_CHARGE]: translation('statusInCharge'),
        [OrderStatus.DELIVERING]: translation('statusDelivering'),
        [OrderStatus.DELIVERED]: translation('statusDelivered')
    }
}

export default getOrderStatusTexts