import { useSelector, useDispatch } from 'react-redux'

import { IconButton } from '@mui/material'

import { Brightness7, Brightness4 } from '@mui/icons-material'

import { RootState } from '@/store'

import { ThemeState, setTheme } from '@/slices/themeSlice'

export default function ThemeSelector() {
    const dispatch = useDispatch()
    const theme = useSelector((state: RootState) => state.theme)

    const handleThemeChange = () => {
        let newTheme: ThemeState

        if (theme === 'light')
            newTheme = 'dark'
        else
            newTheme = 'light'

        dispatch(setTheme(newTheme))
    }

    return (
        <IconButton
            sx={{ ml: 1 }}
            onClick={handleThemeChange}
            color='inherit'
        >
            {theme === 'light' ? <Brightness7 /> : <Brightness4 />}
        </IconButton>
    )
}
