import axios, { AxiosRequestConfig } from 'axios'

const checkAuth = async (): Promise<boolean> => {
    const config: AxiosRequestConfig = {
        method: 'GET',
        url: '/auth/is-authenticated',
    }

    const { data: isAuthenticated } = await axios<boolean>(config)

    return isAuthenticated
}

export default checkAuth
