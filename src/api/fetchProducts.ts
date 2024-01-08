import axios, { AxiosRequestConfig } from 'axios'

import PagedResponse from '@/types/PagedResponse.type'
import Product from '@/types/Product.type'

const fetchProducts = async (page: number, size: number, ids?: string[]): Promise<PagedResponse<Product>> => {
    const config: AxiosRequestConfig = {
        method: 'GET',
        url: '/products',
        params: {
            page,
            size,
            ...(ids && { ids: ids.join(',') })
        }
    }

    const { data: products } = await axios<PagedResponse<Product>>(config)

    return products
}

export default fetchProducts
