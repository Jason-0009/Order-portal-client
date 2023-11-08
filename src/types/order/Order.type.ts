import OrderState from '@/types/order/OrderState.enum'

type Order = {
    date: Date
    totalPrice: number
    state: OrderState
    items: OrderItem[]
}

export default Order