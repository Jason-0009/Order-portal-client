import { FC, useState, useEffect } from 'react'

import { Box, Typography, Divider, Grid, Pagination } from '@mui/material'

import fetchPizzas from '@/api/fetchPizzas'

import PizzaCard from '@/components/pizza/PizzaCard'

type PizzaSelectionProps = {
    initialPizzas: PagedResponse<Pizza>
}

const PizzaSelection: FC<PizzaSelectionProps> = ({ initialPizzas }) => {
    const [currentPage, setCurrentPage] = useState(1)
    const [currentPizzas, setCurrentPizzas] = useState(initialPizzas.content)

    useEffect(() => {
        const fetchAndSetPizzas = async () => {
            const { content } = await fetchPizzas(currentPage - 1)

            setCurrentPizzas(content)
        }

        fetchAndSetPizzas()
    }, [currentPage])

    return (
        <Box sx={{ m: 3, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Typography variant="h6" component="h1" sx={{ fontFamily: 'Open Sans' }} gutterBottom>
                Seleziona la pizza da ordinare
            </Typography>

            <Divider sx={{ mb: 3 }} />

            <Grid container spacing={2} marginTop={1}>
                {currentPizzas.map(pizza => (
                    <Grid item xs={12} sm={6} md={4} key={pizza.id}>
                        <PizzaCard pizza={pizza} />
                    </Grid>
                ))}
            </Grid>

            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                <Pagination color="primary" count={initialPizzas.totalPages} page={currentPage}
                    onChange={(_, value: number) => setCurrentPage(value)} />
            </Box>
        </Box>
    )
}

export default PizzaSelection
