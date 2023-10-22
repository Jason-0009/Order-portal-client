import { AppProps } from 'next/app'

import { Provider } from 'react-redux'

import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'

import { store } from '@/store'

import theme from '@/app/theme'

import Header from '@/components/Header'

const App = (props: AppProps) => {
  const { Component, pageProps } = props

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header />
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  )
}

export default App
