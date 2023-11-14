import axios, { AxiosRequestConfig } from 'axios'

const checkAuth = async (): Promise<boolean> => {
    const config: AxiosRequestConfig = {
        method: 'GET',
        url: '/auth/is-authenticated',
    }

    const { data } = await axios<boolean>(config)

    return data
}

export default checkAuth
