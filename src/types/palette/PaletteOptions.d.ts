import { Palette, PaletteOptions } from '@mui/material/styles'

declare module '@mui/material/styles' {
    interface Palette {
        buttonBackground?: Palette['primary']
        link?: Palette['primary']
        status?: {
            pending?: {
                background: Palette['primary']
                text: Palette['primary']
            }
            inCharge?: {
                background: Palette['primary']
                text: Palette['primary']
            }
            delivering?: {
                background: Palette['primary']
                text: Palette['primary']
            }
            delivered?: {
                background: Palette['primary']
                text: Palette['primary']
            }
        },
        badgeBackground?: Palette['primary']
    }

    interface PaletteOptions {
        buttonBackground?: PaletteOptions['primary']
        link?: PaletteOptions['primary']
        status?: {
            pending?: {
                background: PaletteOptions['primary']
                text: PaletteOptions['primary']
            }
            inCharge?: {
                background: PaletteOptions['primary']
                text: PaletteOptions['primary']
            }
            delivering?: {
                background: PaletteOptions['primary']
                text: PaletteOptions['primary']
            }
            delivered?: {
                background: PaletteOptions['primary']
                text: PaletteOptions['primary']
            }
        }
        badgeBackground?: PaletteOptions['primary']
    }
}