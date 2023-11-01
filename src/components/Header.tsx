import { FC } from 'react'

import { useRouter } from 'next/router'
import NextLink from 'next/link'

import { Link, AppBar, Toolbar, Typography, IconButton } from '@mui/material'

import LocalPizzaIcon from '@mui/icons-material/LocalPizza'
import ShoppingCartCheckout from '@mui/icons-material/ShoppingCartCheckout'

const Header: FC = () => {
    const router = useRouter()
    const isIndexPage = router.pathname === '/'

    return (
        <AppBar position="relative" color="primary">
            <Toolbar sx={{ justifyContent: 'space-between' }}>
                <Link component={NextLink} href="/" color="inherit">
                    <IconButton color="inherit" disableRipple>
                        <LocalPizzaIcon />

                        <Typography variant="h6" sx={{ fontFamily: 'Train One', textTransform: 'uppercase' }}>
                            Awesome Pizza
                        </Typography>
                    </IconButton>
                </Link>

                {isIndexPage && (
                    <Link component={NextLink} href="/orders" underline="none" color="inherit">
                        <IconButton color="inherit" disableRipple>
                            <ShoppingCartCheckout sx={{ mr: 0.5, fontSize: '0.8em' }} />

                            <Typography variant="body1" sx={{ fontWeight: 600 }}>
                                I miei ordini
                            </Typography>
                        </IconButton>
                    </Link>
                )}
            </Toolbar>
        </AppBar >
    )
}

export default Header
