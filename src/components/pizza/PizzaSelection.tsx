import { FC, useState } from 'react'
import { useQuery } from 'react-query'
import { Box, Typography, Divider, Grid, Pagination } from '@mui/material'

import fetchPizzas from '@/api/fetchPizzas'

import CenteredLayout from '../layout/CenteredLayout'
import PizzaCard from './PizzaCard'
import CenteredPaginationBox from '../layout/CenteredPaginationBox'

import PagedResponse from '@/types/PagedResponse.type'
import Pizza from '@/types/Pizza.type'

const PizzaSelection: FC = () => {
    const [currentPage, setCurrentPage] = useState(1)

    const { data: currentPizzas } = useQuery<PagedResponse<Pizza>, Error>
        (['pizzas', currentPage], () => fetchPizzas(currentPage - 1), { keepPreviousData: true })

    const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => setCurrentPage(value)

    return (
        <CenteredLayout>
            <Typography variant="h6" component="h1" gutterBottom>
                Seleziona la pizza da ordinare
            </Typography>

            <Divider sx={{ mb: 3 }} />

            <Grid container spacing={2} marginTop={1}>
                {currentPizzas && currentPizzas.content.map(pizza => (
                    <Grid item xs={12} sm={6} md={4} key={pizza.id}>
                        <PizzaCard pizza={pizza} />
                    </Grid>
                ))}
            </Grid>

            <CenteredPaginationBox>
                <Pagination color="primary" count={currentPizzas?.totalPages} page={currentPage} onChange={handlePageChange} />
            </CenteredPaginationBox>
        </CenteredLayout>
    )
}

export default PizzaSelection
