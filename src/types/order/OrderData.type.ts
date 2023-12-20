import Order from './Order.type'

type OrderData = Omit<Order, 'date'> & { date: number }

export default OrderData