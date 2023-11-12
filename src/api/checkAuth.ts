import axios, { AxiosRequestConfig } from 'axios'

const checkAuth = async (): Promise<boolean> => {
    const config: AxiosRequestConfig = {
        method: 'GET',
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/auth/is-authenticated`,
        withCredentials: true
    }

    const { data } = await axios<boolean>(config)

    return data
}

export default checkAuth
