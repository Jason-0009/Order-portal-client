import axios, { AxiosResponse, AxiosRequestConfig } from 'axios'

import Order from '@/types/order/Order.type'

const postOrder = async (order: Order): Promise<AxiosResponse<any, any>> => {
    const config: AxiosRequestConfig = {
        method: 'POST',
        url: `${process.env.API_URL}/api/orders`,
        data: order,
    }

    return await axios(config)
}

export default postOrder
