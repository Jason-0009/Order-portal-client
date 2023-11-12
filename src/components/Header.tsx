import { FC, useState, MouseEvent, useCallback, useEffect } from 'react'

import { useRouter } from 'next/router'

import { useSelector } from 'react-redux'

import NextLink from 'next/link'

import {
    Link, AppBar, Toolbar, Typography,
    IconButton, Avatar, Button, Popover, Divider, Box
} from '@mui/material'

import LocalPizzaIcon from '@mui/icons-material/LocalPizza'
import ShoppingCartCheckout from '@mui/icons-material/ShoppingCartCheckout'

import { RootState } from '@/store'

import fetchUserProfile from '@/api/fetchUserProfile'

const Header: FC = () => {
    const router = useRouter()
    const isIndexPage = router.pathname === '/'

    const [userProfile, setUserProfile] = useState<User>()
    const [anchorElement, setAnchorElement] = useState<HTMLElement>()

    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated)

    const fetchAndSetUserProfile = useCallback(async () => {
        if (!isAuthenticated) return

        const userProfile = await fetchUserProfile()

        setUserProfile(userProfile)
    }, [isAuthenticated])

    useEffect(() => {
        fetchAndSetUserProfile()
    }, [fetchAndSetUserProfile])

    const handleMenuOpen = (event: MouseEvent<HTMLElement>) =>
        setAnchorElement(event.currentTarget as HTMLElement)

    const handleMenuClose = () => setAnchorElement(undefined)

    const handleLogout = useCallback(() => window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/logout`, [])

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

                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {isIndexPage && isAuthenticated && (
                        <Link component={NextLink} href="/orders" underline="none" color="inherit" justifyContent={'center'}>
                            <IconButton color="inherit" disableRipple>
                                <ShoppingCartCheckout sx={{ mr: 0.5, fontSize: '0.8em' }} />

                                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                                    I miei ordini
                                </Typography>
                            </IconButton>
                        </Link>
                    )}

                    {isAuthenticated && (
                        <>
                            <IconButton color="inherit" onClick={handleMenuOpen}>
                                <Avatar src={userProfile?.imageUrl} />
                            </IconButton>

                            <Popover
                                open={Boolean(anchorElement)}
                                anchorEl={anchorElement}
                                onClose={handleMenuClose}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'center',
                                }}
                            >
                                <Box sx={{ padding: 2, width: 200 }}>
                                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                        {userProfile?.name}
                                    </Typography>

                                    <Typography variant="body2" color="text.secondary">
                                        {userProfile?.email}
                                    </Typography>

                                    <Divider sx={{ my: 1 }} />

                                    <Button onClick={handleLogout} variant="contained" color="primary" fullWidth>
                                        Esci
                                    </Button>
                                </Box>
                            </Popover>
                        </>
                    )}
                </Box>
            </Toolbar>
        </AppBar >
    )
}

export default Header
