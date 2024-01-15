import OrderItem from './OrderItem.type'
import OrderStatus from './OrderStatus.enum'

type Order = {
    id?: string,
    customerId?: string,
    date?: string
    status: OrderStatus
    items: OrderItem[]
    totalPrice: number
}

export default Order