import { FC, useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { Box, Button } from '@mui/material'

import checkAuthentication from '@/api/checkAuthentication'

import GoogleIcon from '@mui/icons-material/Google'

import { RootState } from '@/store'

import Cart from '@/components/cart/Cart'
import PizzaSelection from '@/components/pizza/PizzaSelection'

const Index: FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const cart = useSelector((state: RootState) => state.cart)

  useEffect(() => {
    const validateAuthentication = async () => {
      const isAuthenticated = await checkAuthentication()

      setIsAuthenticated(isAuthenticated)
    }

    validateAuthentication()
  }, [])

  const handleAuthentication = useCallback(() =>
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/oauth2/authorization/google`, [])

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
        onClick={handleAuthentication}
        sx={{
          backgroundColor: 'red',
          color: 'white',
          fontSize: '20px',
          padding: '10px 24px',
          '&:hover': {
            backgroundColor: '#357ae8',
          },
        }}
      >
        <GoogleIcon />
        Effettua il login con Google
      </Button>
    </Box>
  )

  return (
    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
      <Box sx={{ flex: '70%', marginRight: '2%' }}>
        <PizzaSelection />
      </Box>

      {cart.length > 0 && (
        <Box sx={{ flex: '30%' }}>
          <Cart />
        </Box>
      )}
    </Box>
  )
}

export default Index
