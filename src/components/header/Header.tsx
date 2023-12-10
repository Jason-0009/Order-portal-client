import { FC, useState, MouseEvent } from 'react'

import { useRouter } from 'next/router'

import { useSelector } from 'react-redux'

import NextLink from 'next/link'

import {
    Link, AppBar, Toolbar, Typography,
    IconButton, Box, Avatar, Popover,
    Divider, Button
} from '@mui/material'

import { LocalPizza, FactCheck, People, ShoppingCartCheckout } from '@mui/icons-material'

import { RootState } from '@/store'

import HeaderLinkButton from './HeaderLinkButton'

import Role from '@/types/user/Role.enum'
import Route from '@/types/Route.type'

const Header: FC = () => {
    const router = useRouter()

    const [profileMenuAnchorElement, setProfileMenuAnchorElement] = useState<HTMLElement>()

    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated)
    const userProfile = useSelector((state: RootState) => state.userProfile)

    const isAdmin = userProfile?.role === Role.ADMIN

    const iconStyle = { mr: 0.5, fontSize: '0.8em' }

    const handleProfileMenuOpen = ({ currentTarget }: MouseEvent<HTMLElement>) =>
        setProfileMenuAnchorElement(currentTarget as HTMLElement)
    const handleProfileMenuClose = () => setProfileMenuAnchorElement(undefined)

    const handleLogout = () => window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/logout`

    const routes: Route[] = [
        ...(isAdmin ? [
            { path: "/admin/orders", icon: <FactCheck sx={iconStyle} />, text: "Gestione degli ordini" },
            { path: "/admin/users", icon: <People sx={iconStyle} />, text: "Gestione utenti" }
        ] : []),
        { path: "/orders", icon: <ShoppingCartCheckout sx={iconStyle} />, text: "I miei ordini" },
    ]

    return (
        <AppBar position="relative" color="primary" >
            <Toolbar sx={{ justifyContent: 'space-between' }}>
                <Link component={NextLink} href="/" color="inherit">
                    <IconButton color="inherit" disableRipple>
                        <LocalPizza />

                        <Typography variant="h6" sx={{ fontFamily: 'Train One', textTransform: 'uppercase' }}>
                            Awesome Pizza
                        </Typography>
                    </IconButton>
                </Link>

                {isAuthenticated && (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        {routes.map(({ path, icon, text }) => router.pathname !== path && (
                            <HeaderLinkButton
                                key={path}
                                href={path}
                                icon={icon}
                                text={text}
                            />
                        ))}

                        <Box>
                            <IconButton color="inherit" onClick={handleProfileMenuOpen}>
                                <Avatar src={userProfile?.imageUrl} />
                            </IconButton>

                            <Popover
                                open={Boolean(profileMenuAnchorElement)}
                                anchorEl={profileMenuAnchorElement}
                                onClose={handleProfileMenuClose}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'center',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
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
                        </Box>
                    </Box>
                )}
            </Toolbar>
        </AppBar>
    )
}

export default Header
