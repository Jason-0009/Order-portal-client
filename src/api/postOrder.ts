import axios, { AxiosResponse, AxiosRequestConfig } from 'axios'

import Order from '@/types/order/Order.type'

const postOrder = async (order: Order): Promise<AxiosResponse<any, any>> => {
    const config: AxiosRequestConfig = {
        method: 'post',
        url: `${process.env.API_URL}/orders`,
        data: order,
    }

    try {
        const response = await axios(config)

        return response
    } catch (error) {
        throw error
    }
}

export default postOrder
