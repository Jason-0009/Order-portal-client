import { FC, useState, MouseEvent } from 'react'

import { useRouter } from 'next/router'

import { useSelector } from 'react-redux'

import NextLink from 'next/link'

import {
    Link, AppBar, Toolbar, Typography,
    IconButton, Avatar, Popover, Box
} from '@mui/material'

import LocalPizzaIcon from '@mui/icons-material/LocalPizza'
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout'
import PersonIcon from '@mui/icons-material/Person'

import { RootState } from '@/store'

import HeaderLinkButton from './HeaderLinkButton'
import UserProfileMenu from '../UserProfileMenu'

import Role from '@/types/user/Role.enum'

const Header: FC = () => {
    const router = useRouter()
    const isOrdersPage = router.pathname === '/orders'

    const [anchorElement, setAnchorElement] = useState<HTMLElement>()

    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated)
    const userProfile = useSelector((state: RootState) => state.userProfile)

    const isAdmin = userProfile?.role === Role.ADMIN

    const handleMenuOpen = (event: MouseEvent<HTMLElement>) => setAnchorElement(event.currentTarget as HTMLElement)
    const handleMenuClose = () => setAnchorElement(undefined)

    const handleLogout = () => window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/logout`

    return (
        <AppBar position="relative" color="primary" >
            <Toolbar sx={{ justifyContent: 'space-between' }}>
                <Link component={NextLink} href="/" color="inherit">
                    <IconButton color="inherit" disableRipple>
                        <LocalPizzaIcon />

                        <Typography variant="h6" sx={{ fontFamily: 'Train One', textTransform: 'uppercase' }}>
                            Awesome Pizza
                        </Typography>
                    </IconButton>
                </Link>

                {isAuthenticated && (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        {isAdmin && (
                            <HeaderLinkButton
                                href="/admin"
                                icon={<PersonIcon sx={{ mr: 0.5, fontSize: '0.8em' }} />}
                                text="Pannello di controllo"
                            />
                        )}

                        {!isOrdersPage && (
                            <HeaderLinkButton
                                href="/orders"
                                icon={<ShoppingCartCheckoutIcon sx={{ mr: 0.5, fontSize: '0.8em' }} />}
                                text="I miei ordini"
                            />
                        )}

                        {userProfile && <UserProfileMenu
                            userProfile={userProfile}
                            handleMenuOpen={handleMenuOpen}
                            anchorElement={anchorElement}
                            handleMenuClose={handleMenuClose}
                            handleLogout={handleLogout}
                        />}
                    </Box>
                )}
            </Toolbar>
        </AppBar>
    )
}

export default Header
