import { ReactNode } from 'react'
import { useSelector } from 'react-redux'

import { QueryClient, QueryClientProvider } from 'react-query'

import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'

import { RootState } from '@/store'

import { darkTheme, lightTheme } from '@/app/theme'

type ThemedComponentProps = {
    children: ReactNode
}

const queryClient = new QueryClient()

const ThemedComponent = ({ children }: ThemedComponentProps) => {
    const themeName = useSelector((state: RootState) => state.theme)
    const theme = themeName === 'light' ? lightTheme : darkTheme

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />

            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </ThemeProvider>
    )
}

export default ThemedComponent
