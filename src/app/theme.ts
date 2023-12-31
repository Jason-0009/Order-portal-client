import { createTheme } from '@mui/material/styles'

const coreTheme = {
    typography: {
        fontFamily: '"Open Sans", "Helvetica", "Arial", sans-serif',
        fontSize: 14,
        fontWeightLight: 300,
        fontWeightRegular: 400,
        fontWeightMedium: 500,
    }
}

const lightTheme = createTheme({
    ...coreTheme,
    palette: {
        mode: 'light',
        primary: {
            main: '#3f51b5'
        },
        secondary: {
            main: '#f50057'
        }
    }
})

const darkTheme = createTheme({
    ...coreTheme,
    palette: {
        mode: 'dark',
        primary: {
            main: '#90caf9'
        },
        secondary: {
            main: '#ff4081'
        }
    }
})

export { lightTheme, darkTheme }
