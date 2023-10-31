import { FC } from 'react'
import { useSelector } from 'react-redux'

import { Box } from '@mui/material'

import fetchPizzas from '@/api/fetchPizzas'

import PizzaSelection from '@/components/pizza/PizzaSelection'
import Cart from '@/components/cart/Cart'

import { RootState } from '@/store'

type IndexProps = {
  initialPizzas: PagedResponse<Pizza>
}

const Index: FC<IndexProps> = ({ initialPizzas }) => {
  const cart = useSelector((state: RootState) => state.cart)

  return (
    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
      <Box sx={{ flex: '70%', marginRight: '2%' }}>
        <PizzaSelection initialPizzas={initialPizzas} />
      </Box>

      {cart.length > 0 && (
        <Box sx={{ flex: '30%' }}>
          <Cart />
        </Box>
      )}
    </Box>
  )
}

export const getServerSideProps = async () => {
  const initialPizzas = await fetchPizzas(0)

  return { props: { initialPizzas } }
}

export default Index
