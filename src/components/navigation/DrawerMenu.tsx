import { FC, useState } from 'react'

import { Menu } from '@mui/icons-material'
import {
    Box,
    Drawer,
    IconButton,
    Theme,
    useMediaQuery, useTheme
} from '@mui/material'

import MenuItems from './MenuItems'

const DrawerMenu: FC = () => {
    const theme = useTheme()
    const isDesktop = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'))
    const [isOpen, setIsOpen] = useState(false)

    const handleDrawerToggle = () => setIsOpen(!isOpen)

    if (isDesktop) return null

    return (
        <Box sx={{ display: { xs: 'block', lg: 'none' } }}>
            <IconButton onClick={handleDrawerToggle}>
                <Menu sx={{
                    fontSize: { xs: '0.8em', sm: '1em' }
                }} />
            </IconButton>

            <Drawer
                anchor="right"
                open={isOpen}
                onClose={handleDrawerToggle}
                PaperProps={{
                    style: {
                        backgroundImage: 'none',
                        backgroundColor: theme.palette.secondary.main
                    }
                }}
            >
                <MenuItems />
            </Drawer>
        </Box>
    )
}

export default DrawerMenu
