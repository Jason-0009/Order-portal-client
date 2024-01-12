import { useSelector, useDispatch } from 'react-redux'

import { IconButton } from '@mui/material'

import { Brightness7, Brightness4 } from '@mui/icons-material'

import { RootState } from '@/store'

import { ThemeState, setTheme } from '@/slices/themeSlice'

export default function ThemeSelector() {
    const dispatch = useDispatch()
    const theme = useSelector((state: RootState) => state.theme)

    const handleThemeChange = () => {
        if (theme === 'light') {
            dispatch(setTheme('dark'))
            
            return
        }

        dispatch(setTheme('light'))
    }

    return (
        <IconButton
            sx={{ mr: 1 }}
            onClick={handleThemeChange}
            color='inherit'
        >
            {theme === 'light' ? <Brightness7 /> : <Brightness4 />}
        </IconButton>
    )
}
