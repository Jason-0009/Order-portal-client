import { AppProps } from 'next/app'

import { Provider as ReduxProvider } from 'react-redux'

import { SessionProvider } from 'next-auth/react'

import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'

import { store } from '@/store'

import theme from '@/app/theme'

import Header from '@/components/Header'

const App = (props: AppProps) => {
  const { Component, pageProps } = props

  return (
    <ReduxProvider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header />
        <Component {...pageProps} />
      </ThemeProvider>
    </ReduxProvider>
  )
}

export default App
