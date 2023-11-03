import axios, { AxiosRequestConfig } from 'axios'

const fetchPizzas = async (page: number): Promise<PagedResponse<Pizza>> => {
    const config: AxiosRequestConfig = {
        method: 'GET',
        url: `${process.env.API_URL}/pizzas`,
        params: {
            page,
            size: 3
        }
    }

    return (await axios(config)).data
}

export default fetchPizzas
