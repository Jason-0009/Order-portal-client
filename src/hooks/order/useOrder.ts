import { useQuery } from 'react-query'

import fetchOrderById from '@/api/order/fetchOrderById'

import Order from '@/types/order/Order.type'

const useOrder = (id: string): Order | undefined => {
    const { data: order } = useQuery(['order', id], () => fetchOrderById(id),
        { enabled: !!id })

    return order
}

export default useOrder
