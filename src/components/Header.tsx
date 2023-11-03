import { FC, useState, MouseEvent } from 'react'

import { useRouter } from 'next/router'
import { signIn, signOut, useSession } from 'next-auth/react'
import NextLink from 'next/link'

import {
    Link, AppBar, Toolbar, Typography,
    IconButton, Avatar, Button, Menu, MenuItem
} from '@mui/material'

import LocalPizzaIcon from '@mui/icons-material/LocalPizza'
import GoogleIcon from '@mui/icons-material/Google'
import ShoppingCartCheckout from '@mui/icons-material/ShoppingCartCheckout'

const Header: FC = () => {
    const router = useRouter()
    const isIndexPage = router.pathname === '/'

    const { data: session } = useSession()
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

    const handleMenuOpen = (event: MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget as HTMLElement)
    }

    const handleMenuClose = () => {
        setAnchorEl(null)
    }

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

                {session ? (
                    <>
                        <IconButton color="inherit" onClick={handleMenuOpen}>
                            <Avatar src={session.user?.image || ''} />
                        </IconButton>

                        <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleMenuClose}
                        >
                            <MenuItem onClick={() => { handleMenuClose(); signOut() }}>Logout</MenuItem>
                        </Menu>
                    </>
                ) : (
                    <Button
                        startIcon={<GoogleIcon />}
                        onClick={() => signIn('google')}
                        variant="contained"
                        color="secondary"
                    >
                        Effettua il login
                    </Button>
                )}

                {isIndexPage && session && (
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
