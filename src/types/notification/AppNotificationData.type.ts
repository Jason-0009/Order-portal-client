import AppNotification from './AppNotification.type'

type AppNotificationData = Omit<AppNotification, 'date'>
    & { date: number }

export default AppNotificationData