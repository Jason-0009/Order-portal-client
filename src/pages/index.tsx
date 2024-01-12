<<<<<<< HEAD
import { FC } from 'react'
import { useSelector } from 'react-redux'

import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

=======
import { FC, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { useQuery } from 'react-query'

>>>>>>> ef4442a7fcd9330fd6d88aff9a36ea616b943c46
import Head from 'next/head'

import { Box } from '@mui/material'

import withAuth from '@/hoc/withAuth'

import { RootState } from '@/store'

<<<<<<< HEAD
import { useTranslation } from 'next-i18next'

=======
>>>>>>> ef4442a7fcd9330fd6d88aff9a36ea616b943c46
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
        <Box sx={{ width: '63%', marginRight: '2%' }}>
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
