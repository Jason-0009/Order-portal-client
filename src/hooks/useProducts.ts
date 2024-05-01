import { ChangeEvent, useEffect, useState } from 'react'
import { useQuery } from 'react-query'

import fetchProducts from '@/api/fetchProducts'

import PagedResponse from '@/types/PagedResponse.type'
import Product from '@/types/Product.type'

const useProducts = (size: number, itemIds?: number[]) => {
    const [currentPage, setCurrentPage] = useState(1)
    const [products, setProducts] = useState<PagedResponse<Product>>()

    const { data: currentProducts, isLoading } = useQuery(
        ['products', currentPage, itemIds], () => fetchProducts(currentPage - 1, size, itemIds), {
        refetchOnWindowFocus: false
    })

    useEffect(() => {
        if (!currentProducts) return

        setProducts(previousProducts => ({
            ...currentProducts,
            content: [...(previousProducts?.content || []), ...currentProducts.content]
        }))
    }, [currentProducts])

    const handlePageChange = (_: ChangeEvent<unknown>, page: number) => setCurrentPage(page)

    return {
        products,
        isLoading,
        currentPage,
        handlePageChange,
    }
}

export default useProducts
