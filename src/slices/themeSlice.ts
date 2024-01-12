import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type ThemeState = 'light' | 'dark'

const getInitialTheme = (): ThemeState => {
    if (typeof window !== 'undefined')
        return localStorage.getItem('theme') as ThemeState || 'light'

    return 'light'
}

const setBrowserTheme = (theme: ThemeState): ThemeState => {
    if (typeof window !== 'undefined') localStorage.setItem('theme', theme)

    return theme
}

const initialState: ThemeState = getInitialTheme()

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        setTheme: (_state, action: PayloadAction<ThemeState>) =>
            setBrowserTheme(action.payload)
    }
})

export const { setTheme } = themeSlice.actions

export default themeSlice.reducer
