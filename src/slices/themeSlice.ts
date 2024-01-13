import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type ThemeState = 'light' | 'dark'

const getInitialTheme = (): ThemeState => typeof window !== 'undefined' ?
    (localStorage.getItem('theme') as ThemeState || 'light') : 'light'

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
