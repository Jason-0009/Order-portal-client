import { FC } from 'react'

import { useRouter } from 'next/router'
import NextLink from 'next/link'

import { Box, Link, IconButton, Typography } from '@mui/material'
import { FactCheck, People, ShoppingCartCheckout } from '@mui/icons-material'

import useAuth from '@/hooks/useAuth'
import useUserProfile from '@/hooks/user/useUserProfile'

import UserRole from '@/types/user/UserRole.enum'
import Route from '@/types/Route.type'


const Routes: FC = () => {
    const router = useRouter()

    const { isAuthenticated } = useAuth()
    const { userProfile } = useUserProfile(isAuthenticated)

    const isAdmin = userProfile?.role === UserRole.ADMIN
    const iconStyle = { mr: 0.5, fontSize: '0.8em' }

    const routes: Route[] = [
        ...(isAdmin ? [
            { path: "/admin/orders", icon: <FactCheck sx={iconStyle} />, text: "Gestione degli ordini" },
            { path: "/admin/users", icon: <People sx={iconStyle} />, text: "Gestione utenti" }
        ] : []),
        { path: "/orders", icon: <ShoppingCartCheckout sx={iconStyle} />, text: "I miei ordini" },
    ]

    return (
        <Box>
            {routes.map(({ path, icon, text }) => router.pathname !== path && (
                <Link
                    key={path}
                    component={NextLink}
                    href={path}
                    underline="none"
                    color="inherit"
                    justifyContent={'center'}
                >
                    <IconButton color="inherit" disableRipple>
                        {icon}

                        <Typography variant="body1" sx={{ fontWeight: 600 }}>
                            {text}
                        </Typography>
                    </IconButton>
                </Link>
            ))}
        </Box>
    )
}

export default Routes
