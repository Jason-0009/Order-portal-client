import axios, { AxiosRequestConfig } from 'axios'

import PagedResponse from '@/types/PagedResponse.type'

import Order from '@/types/order/Order.type'

const fetchOrdersByUser = async (page: number, date: Date | null, status: string | null): Promise<PagedResponse<Order>> => {
    const config: AxiosRequestConfig = {
        method: 'GET',
        url: '/orders/user',
        params: {
            page,
            size: 5,
            date: date?.toISOString(),
            status
        }
    }

    const { data: orders } = await axios<PagedResponse<Order>>(config)

    return orders
}

export default fetchOrdersByUser
