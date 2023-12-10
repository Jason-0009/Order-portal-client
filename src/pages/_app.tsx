
import { AppProps } from 'next/app'

import { Provider as ReduxProvider } from 'react-redux'

import { QueryClient, QueryClientProvider } from 'react-query'

import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'

import { store } from '@/store'

import theme from '@/app/theme'

import UserAuthenticationStatusCheck from '@/components/UserAuthenticationStatusCheck'
import Header from '@/components/header/Header'

import '@/api/axiosConfig'

const queryClient = new QueryClient()

const App = (props: AppProps) => {
  const { Component, pageProps } = props
  
  return (
    <ReduxProvider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <QueryClientProvider client={queryClient}>
          <UserAuthenticationStatusCheck>
            <Header />
            <Component {...pageProps} />
          </UserAuthenticationStatusCheck>
        </QueryClientProvider>
      </ThemeProvider>
    </ReduxProvider >
  )
}

export default App
