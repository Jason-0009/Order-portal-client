import OrderStatus from './OrderStatus.enum'
import OrderItem from './OrderItem.type'

type Order = {
    id?: string,
    customerId?: string,
    date?: string
    status: OrderStatus
    items: OrderItem[]
    totalPrice: number
}

export default Order