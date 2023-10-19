import axios, { AxiosRequestConfig } from 'axios'

const fetchPizzas = async (page: number): Promise<PagedResponse<Pizza>> => {
    const config: AxiosRequestConfig = {
        method: 'get',
        url: `${process.env.API_URL}/pizzas`,
        params: {
            page,
            size: 3,
        },
    }

    try {
        const { data } = await axios(config)

        return data
    } catch (error) {
        throw error
    }
}

export default fetchPizzas
