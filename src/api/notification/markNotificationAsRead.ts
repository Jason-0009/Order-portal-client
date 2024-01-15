import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

const markNotificationAsRead = async (notificationId: string): Promise<AxiosResponse> => {
    const config: AxiosRequestConfig = {
        method: 'PUT',
        url: `/notifications/${notificationId}`
    }

    return await axios(config)
}

export default markNotificationAsRead
