import { AppProps } from 'next/app'

import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'

import theme from '@/app/theme'
import Header from '@/components/Header'

const App = (props: AppProps) => {
  const { Component, pageProps } = props

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default App
