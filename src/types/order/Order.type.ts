import OrderItem from './OrderItem.type'
import OrderStatus from './OrderStatus.enum'

type Order = {
    id?: number,
    customerId?: string,
    date?: string
    status: OrderStatus
    items: OrderItem[]
    totalPrice: number
}

export default Order