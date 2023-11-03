import { FC } from 'react'
import { useSelector } from 'react-redux'

import { GetServerSidePropsContext } from 'next'
import { Session } from 'next-auth'
import { signIn, signOut } from 'next-auth/react'

import { Box, Button } from '@mui/material'

import { RootState } from '@/store'

// import fetchPizzas from '@/api/fetchPizzas'

// import PizzaSelection from '@/components/pizza/PizzaSelection'
// import Cart from '@/components/cart/Cart'

import { useSession } from 'next-auth/react'

type IndexProps = {
  initialPizzas: PagedResponse<Pizza>
  session: Session | null
}

const Index: FC/* <IndexProps> */ = (/* { initialPizzas, session } */) => {
  const { data: session, status } = useSession()

  return <></>
  // const cart = useSelector((state: RootState) => state.cart)

  // if (!session) return (
  //   <Box>
  //     Not signed in <br />
  //     <Button onClick={() => signIn('google')}>Sign in with Google</Button>
  //   </Box>
  // )

  // return (
  //   <Box sx={{ display: 'flex', flexDirection: 'row' }}>
  //     <Box sx={{ flex: '70%', marginRight: '2%' }}>
  //       <PizzaSelection initialPizzas={initialPizzas} />
  //     </Box>

  //     {cart.length > 0 && (
  //       <Box sx={{ flex: '30%' }}>
  //         <Cart />
  //       </Box>
  //     )}
  //   </Box>
  // )
}

/* export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  // const session = await getSession(context)
  // console.log({ session })
  // let initialPizzas = null

  // if (session) {
  //   initialPizzas = await fetchPizzas(0)
  // }

  // return { props: { initialPizzas, session } }
} */

export default Index
