import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

import OrderStatus from '@/types/order/OrderStatus.enum'

const updateOrderStatus = async (orderId: string, status: OrderStatus): Promise<AxiosResponse> => {
    const config: AxiosRequestConfig = {
        method: 'PUT',
        url: `/orders/${orderId}`,
        data: JSON.stringify(status),
        headers: { 'Content-Type': 'application/json' }
    }

    return await axios(config)
}

export default updateOrderStatus
