import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type ThemeState = 'light' | 'dark'

const getInitialTheme = (): ThemeState => {
    if (typeof window === 'undefined') return 'light'

    const savedTheme = localStorage.getItem('theme') as ThemeState

    if (savedTheme) return savedTheme

    const userPrefersDark = window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches

    return userPrefersDark ? 'dark' : 'light'
}

const setBrowserTheme = (theme: ThemeState): ThemeState =>
    (typeof window !== 'undefined' && localStorage.setItem('theme', theme), theme)

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
