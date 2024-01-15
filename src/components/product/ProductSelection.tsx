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
            <Typography variant="h6" component="h1" fontWeight={600} sx={{
                fontSize: { xs: '1.1em', sm: '1.15em', md: '1.25em' }
            }}>
                {translation('selectProduct')}
            </Typography>

            <Grid container spacing={4} alignItems="stretch">
                {currentProducts?.content.map(product => {
                    const { id } = product

                    return (
                        <Grid item xs={12} sm={6} md={4} key={id}>
                            <ProductCard product={product} />
                        </Grid>
                    )
                })}
            </Grid>

            <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
                <Pagination
                    color="secondary"
                    count={currentProducts?.totalPages}
                    page={currentPage}
                    onChange={handlePageChange}
                    sx={{
                        '& .MuiPaginationItem-root': {
                            fontSize: { xs: '0.7rem', sm: '0.8rem' }
                        }
                    }}
                />
            </Box>
        </CenteredLayout>
    )
}

export default ProductSelection
