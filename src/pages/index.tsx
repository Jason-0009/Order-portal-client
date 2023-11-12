import { FC, useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Box, Button } from '@mui/material'

import GoogleIcon from '@mui/icons-material/Google'

import checkAuth from '@/api/checkAuth'

import { RootState } from '@/store'

import { setAuth } from '@/slices/authSlice'

import Cart from '@/components/cart/Cart'
import PizzaSelection from '@/components/pizza/PizzaSelection'

const Index: FC = () => {
  const dispatch = useDispatch()

  const cart = useSelector((state: RootState) => state.cart)
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated)

  const checkAndSetAuth = useCallback(async () => {
    const isAuthenticated = await checkAuth()

    dispatch(setAuth(isAuthenticated))
  }, [dispatch])

  useEffect(() => {
    checkAndSetAuth()
  }, [checkAndSetAuth])

  const handleAuth = useCallback(() => window.location.href =
    `${process.env.NEXT_PUBLIC_API_URL}/oauth2/authorization/google`, [])

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
        startIcon={<GoogleIcon />}
      >
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
