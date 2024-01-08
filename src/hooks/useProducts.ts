import { useState, ChangeEvent } from 'react'
import { useQuery } from 'react-query'

import fetchProducts from '@/api/fetchProducts'

const useProducts = (fetchAll = true, size: number, itemIds?: string[]) => {
    const [currentPage, setCurrentPage] = useState(1)

    const { data: currentProducts } = useQuery(
        ['products', currentPage], () => fetchProducts(currentPage - 1, size, itemIds),
        { keepPreviousData: true, enabled: fetchAll || !!(itemIds && itemIds.length > 0) }
    )

    const handlePageChange = (_: ChangeEvent<unknown>, page: number) => setCurrentPage(page)

    return {
        currentProducts,
        currentPage,
        handlePageChange,
    }
}

export default useProducts
