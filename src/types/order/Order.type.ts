import OrderState from './OrderState.enum'
import OrderItem from './OrderItem.type'

type Order = {
    id?: string,
    date?: string
    state: OrderState
    items: OrderItem[]
    totalPrice: number
}

export default Order