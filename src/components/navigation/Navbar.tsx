
import React, { FC } from 'react'

import { useTranslation } from 'next-i18next'
import NextLink from 'next/link'

import { Link, AppBar, Toolbar, Typography, IconButton, Box } from '@mui/material'
import { LocalPizza } from '@mui/icons-material'

import DrawerMenu from './DrawerMenu'
import MenuItems from './MenuItems'

const Navbar: FC = () => {
    const { t: translation } = useTranslation()

    return (
        <AppBar sx={{
            fontFamily: 'Heebo',
            backgroundColor: 'secondary.main',
            backgroundImage: 'none',
            boxShadow: 'none'
        }}>
            <Toolbar sx={{ justifyContent: 'space-between' }}>
                <Link component={NextLink} href="/" color="inherit">
                    <IconButton color="inherit" disableRipple>
                        <LocalPizza sx={{
                            fontSize: { xs: '0.8em', sm: '1em' },
                        }} />

                        <Typography variant="h6" sx={{
                            textTransform: 'uppercase',
                            textShadow: '0px 0px 10px currentColor',
                            fontWeight: 700,
                            letterSpacing: '1px',
                            fontSize: { xs: '0.6em', sm: '0.8em' },
                            ml: 1
                        }}>
                            {translation('title')}
                        </Typography>
                    </IconButton>
                </Link>

                <Box sx={{ display: { xs: 'none', lg: 'flex' } }}>
                    <MenuItems />
                </Box>

                <DrawerMenu />
            </Toolbar>
        </AppBar>
    )
}

export default Navbar
