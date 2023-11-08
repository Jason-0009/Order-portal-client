import axios, { AxiosRequestConfig } from 'axios'

const checkAuthentication = async (): Promise<boolean> => {
    const config: AxiosRequestConfig = {
        method: 'GET',
        url: `${process.env.NEXT_PUBLIC_API_URL}/auth-status`,
        withCredentials: true
    }

    try {
        const { data } = await axios(config)

        return data
    } catch (error) {
        return false
    }
}

export default checkAuthentication
