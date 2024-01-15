import { AppProps } from 'next/app'

import { Provider as ReduxProvider } from 'react-redux'

import { appWithTranslation } from 'next-i18next'

import { store } from '@/store'

import ThemedComponent from '@/components/ThemedComponent'
import Navbar from '@/components/navigation/Navbar'

import { useEffect, useState } from 'react'

import '@/api/axiosConfig'

const App = (props: AppProps) => {
  const { Component, pageProps } = props
  
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null

  return (
    <ReduxProvider store={store}>
      <ThemedComponent>
        <Navbar />
        <Component {...pageProps} />
      </ThemedComponent>
    </ReduxProvider>
  )
}

export default appWithTranslation(App)
