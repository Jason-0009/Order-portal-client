import { FC } from 'react'
import { useSelector } from 'react-redux'

import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import Head from 'next/head'

import { Box } from '@mui/material'

import withAuth from '@/hoc/withAuth'

import { RootState } from '@/store'

import { useTranslation } from 'next-i18next'

import ProductSelection from '@/components/product/ProductSelection'
import Cart from '@/components/cart/Cart'

const IndexPage: FC = () => {
  const { t: translation } = useTranslation()
  const cart = useSelector((state: RootState) => state.cart)

  return (
    <>
      <Head>
        <title>
          {translation('title')}
        </title>
      </Head>

      <Box sx={{ display: 'flex', flexDirection: 'row' }}>
        <Box sx={{
          width: cart.length > 0 ? '63%' : '100%',
          marginRight: cart.length > 0 ? '2%' : '0'
        }}>
          <ProductSelection />
        </Box>

        {cart.length > 0 && (
          <Box sx={{ width: '35%' }}>
            <Cart />
          </Box>
        )}
      </Box>

    </>
  )
}

export const getServerSideProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale))
  }
})

export default withAuth(IndexPage)
