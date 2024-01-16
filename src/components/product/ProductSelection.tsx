import { FC } from 'react'

import { useTranslation } from 'next-i18next'

import { Grid } from '@mui/material'

import useProducts from '@/hooks/useProducts'

import PaginationComponent from '../common/PaginationComponent'

import CenteredLayout from '../common/layout/CenteredLayout'
import LoadingState from '../common/layout/LoadingState'

import PageTitle from '../common/page/PageTitle'

import ProductCard from './ProductCard'

const ProductSelection: FC = () => {
    const { currentProducts, isLoading, currentPage, handlePageChange } = useProducts(true, 9)

    const { t: translation } = useTranslation()

    if (isLoading) return (
        <LoadingState />
    )

    return (
        <CenteredLayout>
            <PageTitle text={translation('selectProduct')} sx={{
                textAlign: { xs: 'center', sm: 'start' }
            }} />

            <Grid container spacing={4} alignItems="stretch">
                {currentProducts?.content.map(product =>
                    <Grid item xs={12} sm={6} md={4} key={product.id}>
                        <ProductCard product={product} />
                    </Grid>
                )}
            </Grid>

            <PaginationComponent
                count={currentProducts?.totalPages}
                page={currentPage}
                onChange={handlePageChange}
            />
        </CenteredLayout>
    )
}

export default ProductSelection
