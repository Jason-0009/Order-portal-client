import { FC } from 'react'

import { Typography, Divider, Grid, Pagination, Box } from '@mui/material'

import useProducts from '@/hooks/useProducts'

import CenteredLayout from '../common/CenteredLayout'
import ProductCard from './ProductCard'

const ProductSelection: FC = () => {
    const {
        currentProducts,
        currentPage,
        handlePageChange,
    } = useProducts()
    
    return (
        <CenteredLayout>
            <Typography variant="h6" component="h1" gutterBottom>
                Seleziona la pizza da ordinare
            </Typography>

            <Divider sx={{ mb: 3 }} />

            <Grid container spacing={2} marginTop={1}>
                {currentProducts?.content.map(product => (
                    <Grid item xs={12} sm={6} md={4} key={product.id}>
                        <ProductCard product={product} />
                    </Grid>
                ))}
            </Grid>

            <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
                <Pagination
                    color="primary"
                    count={currentProducts?.totalPages}
                    page={currentPage}
                    onChange={handlePageChange}
                />
            </Box>
        </CenteredLayout>
    )
}

export default ProductSelection
