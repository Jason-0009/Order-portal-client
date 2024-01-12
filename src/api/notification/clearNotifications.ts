import axios, { AxiosResponse, AxiosRequestConfig } from 'axios'

const clearNotifications = async (userId: string): Promise<AxiosResponse> => {
    const config: AxiosRequestConfig = {
        method: 'DELETE',
        url: `/notifications/${userId}`
    }

    return await axios(config)
}

export default clearNotifications