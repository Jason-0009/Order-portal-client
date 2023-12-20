import { useQuery } from 'react-query'

import fetchOrderById from '@/api/order/fetchOrderById'

const useOrder = (id: string) => {
    const { data: order } = useQuery(['order', id], () => fetchOrderById(id),
        { enabled: !!id })

    return order
}

export default useOrder
