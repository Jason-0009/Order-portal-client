import axios, { AxiosRequestConfig } from 'axios'
import { stringify } from 'qs'

import PagedResponse from '@/types/PagedResponse.type'
import Product from '@/types/Product.type'

const fetchProducts = async (page: number, size: number, ids?: number[]): Promise<PagedResponse<Product>> => {
    const config: AxiosRequestConfig = {
        method: 'GET',
        url: '/products',
        params: ids && ids.length > 0 ?
            { page, size, ids } :
            { page, size },
        paramsSerializer: params => stringify(params, { arrayFormat: 'repeat' })
    }

    const { data: products } = await axios<PagedResponse<Product>>(config)

    return products
}

export default fetchProducts
