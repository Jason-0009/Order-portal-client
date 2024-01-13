import { FC } from 'react'

import { useTranslation } from 'next-i18next'

import { Typography, Grid, Pagination, Box, CircularProgress } from '@mui/material'

import useProducts from '@/hooks/useProducts'

import CenteredLayout from '../common/CenteredLayout'
import CenteredBox from '../common/CenteredBox'
import ProductCard from './ProductCard'

const ProductSelection: FC = () => {
    const { currentProducts, isLoading, currentPage, handlePageChange } = useProducts(true, 9)

    const { t: translation } = useTranslation()

    if (isLoading) return (
        <CenteredBox>
            <CircularProgress color="error" />
        </CenteredBox>
    )

    return (
        <CenteredLayout>
            <Typography variant="h6" component="h1" fontWeight={600}>
                {translation('selectProduct')}
            </Typography>

            <Grid container spacing={4}>
                {currentProducts?.content.map(product => (
                    <Grid item xs={12} sm={6} md={4} key={product.id}>
                        <ProductCard product={product} />
                    </Grid>
                ))}
            </Grid>

            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6, mb: 1 }}>
                <Pagination
                    color="secondary"
                    count={currentProducts?.totalPages}
                    page={currentPage}
                    onChange={handlePageChange}
                />
            </Box>
        </CenteredLayout>
    )
}

export default ProductSelection
