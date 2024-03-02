import axios, { AxiosError, AxiosRequestConfig } from 'axios'

const checkAdmin = async (): Promise<boolean> => {
    const config: AxiosRequestConfig = {
        method: 'GET',
        url: '/users/is-admin',
    }

    try {
        const { data: isAdmin } = await axios<boolean>(config)
        
        return isAdmin
    } catch (error) {
        const axiosError = error as AxiosError

        if (!axiosError.response || axiosError.response.status !== 403) 
            throw error
        
        return false
    }
}

export default checkAdmin
