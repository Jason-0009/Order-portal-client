import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

const markNotificationAsRead = async (notificationId: number): Promise<AxiosResponse> => {
    const config: AxiosRequestConfig = {
        method: 'PUT',
        url: `/notifications/${notificationId}`
    }

    return await axios(config)
}

export default markNotificationAsRead
