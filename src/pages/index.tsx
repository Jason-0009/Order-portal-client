import { FC, useState, useEffect, ChangeEvent } from 'react'

import { Box, Typography, Divider, Pagination } from '@mui/material'

import fetchPizzas from '@/api/fetchPizzas'

type IndexProps = {
  initialPizzas: PagedResponse<Pizza>
}

const Index: FC<IndexProps> = ({ initialPizzas }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [currentPizzas, setCurrentPizzas] = useState(initialPizzas.content)

  useEffect(() => {
    const fetchAndSetPizzas = async () => {
      const pizzas = await fetchPizzas(currentPage - 1)

      setCurrentPizzas(pizzas.content)
    }

    fetchAndSetPizzas()
  }, [currentPage])

  const paginate = (_event: ChangeEvent<unknown>, value: number) => setCurrentPage(value)

  return (
    <Box sx={{ ml: 2 }}>
      <Typography variant="h6" component="h1" sx={{ fontFamily: 'Open Sans', fontWeight: 500, mt: 2, mb: 2 }}>
        Seleziona la pizza da ordinare
      </Typography>

      <Divider />

      {currentPizzas.map(pizza => (
        <Typography key={pizza.id} variant="h6" component="div">
          {pizza.name}
          {pizza.price}
        </Typography>
      ))}

      <Pagination count={initialPizzas.totalPages} page={currentPage} onChange={paginate} color="primary" />
    </Box>
  )
}

export const getStaticProps = async () => {
  const initialPizzas = await fetchPizzas(0)

  return { props: { initialPizzas } }
}


export default Index
