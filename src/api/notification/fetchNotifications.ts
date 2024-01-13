import axios, { AxiosRequestConfig } from 'axios'

import AppNotification from '@/types/notification/AppNotification.type'

const fetchNotifications = async (userId: string): Promise<AppNotification[]> => {
    const config: AxiosRequestConfig = {
        method: 'GET',
        url: `/notifications/${userId}`
    }

    const { data: notifications } = await axios<AppNotification[]>(config)

    return notifications
}

export default fetchNotifications
