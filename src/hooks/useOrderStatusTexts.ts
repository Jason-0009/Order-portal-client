import { useTranslation } from 'next-i18next'

import OrderStatus from '@/types/order/OrderStatus.enum'

export const useOrderStatusTexts = () => {
    const { t: translation } = useTranslation()

    return {
        [OrderStatus.PENDING]: translation('statusPending'),
        [OrderStatus.IN_CHARGE]: translation('statusInCharge'),
        [OrderStatus.DELIVERING]: translation('statusDelivering'),
        [OrderStatus.DELIVERED]: translation('statusDelivered')
    }
}
