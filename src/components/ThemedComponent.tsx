import { ReactNode } from 'react'
import { useSelector } from 'react-redux'

import { QueryClient, QueryClientProvider } from 'react-query'

import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'

import { RootState } from '@/store'

import { lightTheme, darkTheme } from '@/app/theme'

type ThemedComponentProps = {
    children: ReactNode
}

const queryClient = new QueryClient()

const getTheme = (themeName: string) =>
    themeName === 'light' ? lightTheme : darkTheme

const ThemedComponent = ({ children }: ThemedComponentProps) => {
    const themeName = useSelector((state: RootState) => state.theme)
    const theme = getTheme(themeName)

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
