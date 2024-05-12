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
    
        setProducts(previousProducts => {
            const combinedContent = [...(previousProducts?.content || []), ...currentProducts.content]
            const uniqueContent = Array.from(new Set(combinedContent.map(product => product.id)))
                .map(id => combinedContent.find(product => product.id === id))
                .filter((product): product is Product => product !== undefined)
    
            return {
                ...currentProducts,
                content: uniqueContent
            }
        })
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
