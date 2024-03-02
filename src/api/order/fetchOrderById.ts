import axios, { AxiosRequestConfig } from 'axios'

import Order from '@/types/order/Order.type'

const fetchOrderById = async (id: number): Promise<Order> => {
    const config: AxiosRequestConfig = {
        method: 'GET',
        url: `/orders/${id}`
    }

    const { data: order } = await axios<Order>(config)

    return order
}

export default fetchOrderById
