import { FC } from 'react'
import { useSelector } from 'react-redux'

import { Box, Button } from '@mui/material'
import { Google } from '@mui/icons-material'

import { RootState } from '@/store'

import useAuth from '@/hooks/useAuth'

import ProductSelection from '@/components/product/ProductSelection'
import Cart from '@/components/cart/Cart'

const IndexPage: FC = () => {
  const { isAuthenticated } = useAuth()

  const cart = useSelector((state: RootState) => state.cart)

  const handleAuth = () => window.location.href =
    `${process.env.NEXT_PUBLIC_API_URL}/oauth2/authorization/google`

  if (!isAuthenticated) return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh'
      }}
    >
      <Button
        onClick={handleAuth}
        sx={{
          backgroundColor: 'primary.main',
          color: 'white',
          fontSize: '20px',
          padding: '10px 24px',
          '&:hover': {
            backgroundColor: 'primary.dark'
          }
        }}
        startIcon={<Google />}
      >
        Effettua il login con Google
      </Button>
    </Box>
  )

  return (
    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
      <Box sx={{ flex: '70%', marginRight: '2%' }}>
        <ProductSelection />
      </Box>

      {cart.length > 0 && (
        <Box sx={{ flex: '30%' }}>
          <Cart />
        </Box>
      )}
    </Box>
  )
}

export default IndexPage
