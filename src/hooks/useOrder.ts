import { useState } from 'react'
import { useQuery } from 'react-query'

import fetchOrderById from '@/api/order/fetchOrderById'

import usePizzas from './usePizzas'

const useOrder = (id: string) => {
    const { data: order } = useQuery(['order', id],
        () => fetchOrderById(id), { enabled: !!id })

    const itemIds = order?.items.map(item => item.id)

    const { currentPizzas, currentPage, handlePageChange } = usePizzas(itemIds)

    return {
        order,
        currentPizzas,
        currentPage,
        handlePageChange,
    }
}

export default useOrder
