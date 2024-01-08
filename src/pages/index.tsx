import { FC } from 'react'
import { useSelector } from 'react-redux'

import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { Box } from '@mui/material'

import { RootState } from '@/store'

import withAuth from '@/hoc/withAuth'

import ProductSelection from '@/components/product/ProductSelection'
import Cart from '@/components/cart/Cart'

const IndexPage: FC = () => {
  const cart = useSelector((state: RootState) => state.cart)

  return (
    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
      <Box sx={{ width: '63%', marginRight: '2%' }}>
        <ProductSelection />
      </Box>

      {cart.length > 0 && (
        <Box sx={{ width: '35%' }}>
          <Cart />
        </Box>
      )}
    </Box>
  )
}

export const getServerSideProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale))
  }
})

export default withAuth(IndexPage)
