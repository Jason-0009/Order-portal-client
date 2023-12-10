import { useState } from 'react'

import { useQuery } from 'react-query'

import fetchAllOrders from '@/api/order/fetchAllOrders'

import OrderStatus from '@/types/order/OrderStatus.enum'

const useOrders = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [filteredDate, setFilteredDate] = useState<Date | null>(null)
    const [filteredStatus, setFilteredStatus] = useState<OrderStatus | null>(null)

    const { data: currentOrders, isLoading, refetch } = useQuery(
        ['orders', currentPage, filteredDate, filteredStatus],
        () => fetchAllOrders(currentPage - 1, filteredDate, filteredStatus),
        { keepPreviousData: true }
    )

    return {
        currentOrders,
        isLoading,
        refetch,
        currentPage,
        setCurrentPage,
        filteredDate,
        setFilteredDate,
        filteredStatus,
        setFilteredStatus,
    }
}

export default useOrders
