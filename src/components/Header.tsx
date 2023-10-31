import { FC } from 'react'

import { Link, AppBar, Toolbar, Typography, IconButton } from '@mui/material'

import NextLink from 'next/link'

import LocalPizzaIcon from '@mui/icons-material/LocalPizza'
import ShoppingCart from '@mui/icons-material/ShoppingCart'

const Header: FC = () => {
    return (
        <AppBar position="relative" color="primary">
            <Toolbar sx={{ justifyContent: 'space-between' }}>
                <Link component={NextLink} href="/" underline="none" color="inherit">
                    <IconButton color="inherit">
                        <LocalPizzaIcon />
                        <Typography variant="h6" sx={{ fontFamily: 'Train One', textTransform: 'uppercase' }}>
                            Awesome Pizza
                        </Typography>
                    </IconButton>
                </Link>

                <Link component={NextLink} href="/orders" underline="none" color="inherit">
                    <IconButton color="inherit">
                        <ShoppingCart />
                        
                        <Typography variant="h6">
                            I miei ordini
                        </Typography>
                    </IconButton>
                </Link>
            </Toolbar>
        </AppBar >
    )
}

export default Header
