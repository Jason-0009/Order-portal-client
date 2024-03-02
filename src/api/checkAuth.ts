import axios, { AxiosRequestConfig } from 'axios'

const checkAuth = async (): Promise<void> => {
    const config: AxiosRequestConfig = {
        method: 'GET',
        url: '/auth/check',
    }

    await axios<boolean>(config)
}

export default checkAuth
