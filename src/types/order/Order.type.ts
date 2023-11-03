import OrderState from '@/types/order/OrderState.enum'

type Order = {
    customerId: string
    date: Date
    totalPrice: number
    state: OrderState
    items: OrderItem[]
}

export default Order