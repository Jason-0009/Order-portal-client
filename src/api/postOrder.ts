import axios, { AxiosRequestConfig } from 'axios'

const postOrder = async (order: CartItem): Promise<void> => {
    const config: AxiosRequestConfig = {
        method: 'post',
        url: `${process.env.API_URL}/orders`,
        data: order,
    }

    try {
        await axios(config)
    } catch (error) {
        throw error
    }
}

export default postOrder
