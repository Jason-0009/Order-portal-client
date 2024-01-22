import { FC } from 'react'
import { useSelector } from 'react-redux'

import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import Head from 'next/head'

import { Grid } from '@mui/material'

import { useTranslation } from 'next-i18next'

import withAuth from '@/hoc/withAuth'

import { RootState } from '@/store'

import CenteredLayout from '@/components/common/layout/CenteredLayout'

import Cart from '@/components/cart/Cart'

import ProductSelection from '@/components/product/ProductSelection'


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

      <Grid container spacing={4} sx={{
        mb: { xs: 4, lg: 0 }
      }}>
        <Grid item xs={12} lg={cart.length > 0 ? 8 : 12}>
          <ProductSelection />
        </Grid>

        {cart.length > 0 && (
          <Grid item xs={12} lg={4}>
            <Cart />
          </Grid>
        )}
      </Grid>
    </>
  )
}

export const getServerSideProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale))
  }
})

export default withAuth(IndexPage)
