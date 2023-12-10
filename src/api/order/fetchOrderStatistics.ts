import axios, { AxiosRequestConfig } from 'axios'

import OrderStatistics from '@/types/order/OrderStatistics.type'

const fetchOrdersStatistics = async (): Promise<OrderStatistics> => {
    const config: AxiosRequestConfig = {
        method: 'GET',
        url: '/orders/statistics'
    }

    const { data: statistics } = await axios<OrderStatistics>(config)

    return statistics
}

export default fetchOrdersStatistics
