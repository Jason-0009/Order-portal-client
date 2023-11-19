import axios, { AxiosRequestConfig } from 'axios'

import PagedResponse from '@/types/PagedResponse.type'
import Pizza from '@/types/Pizza.type'

const fetchPizzas = async (page: number): Promise<PagedResponse<Pizza>> => {
    const config: AxiosRequestConfig = {
        method: 'GET',
        url: '/pizzas',
        params: {
            page,
            size: 3
        }
    }

    const { data: pizzas } = await axios<PagedResponse<Pizza>>(config)

    return pizzas
}

export default fetchPizzas
