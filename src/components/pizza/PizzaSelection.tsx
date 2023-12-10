import { FC } from 'react'

import { Typography, Divider, Grid, Pagination } from '@mui/material'

import usePizzas from '@/hooks/usePizzas'

import CenteredLayout from '../layout/CenteredLayout'
import PizzaCard from './PizzaCard'
import CenteredBox from '../layout/CenteredBox'

const PizzaSelection: FC = () => {
    const {
        currentPizzas,
        currentPage,
        handlePageChange,
    } = usePizzas()
    
    return (
        <CenteredLayout>
            <Typography variant="h6" component="h1" gutterBottom>
                Seleziona la pizza da ordinare
            </Typography>

            <Divider sx={{ mb: 3 }} />

            <Grid container spacing={2} marginTop={1}>
                {currentPizzas?.content.map(pizza => (
                    <Grid item xs={12} sm={6} md={4} key={pizza.id}>
                        <PizzaCard pizza={pizza} />
                    </Grid>
                ))}
            </Grid>

            <CenteredBox>
                <Pagination
                    color="primary"
                    count={currentPizzas?.totalPages}
                    page={currentPage}
                    onChange={handlePageChange}
                />
            </CenteredBox>
        </CenteredLayout>
    )
}

export default PizzaSelection
