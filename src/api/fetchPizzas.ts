import axios, { AxiosRequestConfig } from 'axios'

const fetchPizzas = async (page: number): Promise<PagedResponse<Pizza>> => {
    const config: AxiosRequestConfig = {
        method: 'GET',
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/pizzas`,
        params: {
            page,
            size: 3
        },
        withCredentials: true
    }

    const { data } = await axios<PagedResponse<Pizza>>(config)

    return data
}

export default fetchPizzas
