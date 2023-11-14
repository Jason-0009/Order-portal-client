import axios, { AxiosRequestConfig } from 'axios'

const fetchPizzas = async (page: number): Promise<PagedResponse<Pizza>> => {
    const config: AxiosRequestConfig = {
        method: 'GET',
        url: '/pizzas',
        params: {
            page,
            size: 3
        }
    }

    const { data } = await axios<PagedResponse<Pizza>>(config)

    return data
}

export default fetchPizzas
