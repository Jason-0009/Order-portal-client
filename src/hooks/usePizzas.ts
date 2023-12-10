import { useState, ChangeEvent } from 'react'

import { useQuery } from 'react-query'

import fetchPizzas from '@/api/fetchPizzas'

const usePizzas = (itemIds?: string[]) => {
    const [currentPage, setCurrentPage] = useState(1)

    const { data: currentPizzas, refetch } = useQuery(
        ['pizzas', currentPage], () => fetchPizzas(currentPage - 1, itemIds),
        { keepPreviousData: true }
    )

    const handlePageChange = (_: ChangeEvent<unknown>, value: number) => setCurrentPage(value)

    return {
        currentPizzas,
        refetch,
        currentPage,
        handlePageChange,
    }
}

export default usePizzas
