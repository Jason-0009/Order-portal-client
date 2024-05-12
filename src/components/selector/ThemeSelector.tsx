import { useDispatch, useSelector } from 'react-redux'

import { IconButton, SxProps } from '@mui/material'

import { Brightness4, Brightness7 } from '@mui/icons-material'

import { RootState } from '@/store'

import { setTheme } from '@/slices/themeSlice'

export default function ThemeSelector() {
    const dispatch = useDispatch()
    const theme = useSelector((state: RootState) => state.theme)

    const iconStyles: SxProps = { fontSize: { xs: '0.75em', sm: '0.8em', md: '0.85em', lg: '0.9em' } }

    const handleThemeChange = () => theme === 'light' ? dispatch(setTheme('dark')) : dispatch(setTheme('light'))

    return (
        <IconButton
            sx={{
                mr: 1,
                '&:hover': {
                    backgroundColor: 'primary.main'
                }
            }}
            onClick={handleThemeChange}
            color='inherit'
        >
            {theme === 'light' ? <Brightness7 sx={iconStyles} /> : <Brightness4 sx={iconStyles} />}
        </IconButton>
    )
}
