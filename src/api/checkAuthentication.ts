import axios, { AxiosRequestConfig } from 'axios'

const checkAuthentication = async (): Promise<boolean> => {
    const config: AxiosRequestConfig = {
        method: 'GET',
        url: `${process.env.NEXT_PUBLIC_API_URL}/is-authenticated`,
        withCredentials: true
    }

    const { data } = await axios(config)

    return data
}

export default checkAuthentication
