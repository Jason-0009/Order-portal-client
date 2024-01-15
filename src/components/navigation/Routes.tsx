import { FC, Fragment } from 'react'
import { useQuery } from 'react-query'

import { useRouter } from 'next/router'
import NextLink from 'next/link'
import { useTranslation } from 'next-i18next'

import {
    Link, IconButton, Typography,
    Divider, useTheme, useMediaQuery, SxProps, Box, Theme
} from '@mui/material'
import { LocalShipping, ManageAccounts, ViewList } from '@mui/icons-material'

import checkAuth from '@/api/checkAuth'

import fetchUserProfile from '@/api/user/fetchUserProfile'

import UserRole from '@/types/user/UserRole.enum'
import Route from '@/types/Route.type'

const Routes: FC = () => {
    const router = useRouter()
    const isMobileOrTablet = useMediaQuery((theme: Theme) => theme.breakpoints.down('lg'))

    const { data: isAuthenticated } = useQuery('auth', checkAuth)
    const { data: userProfile } = useQuery('userProfile', fetchUserProfile,
        { enabled: !!isAuthenticated })

    const { t: translation } = useTranslation()

    const isAdmin = userProfile?.role === UserRole.ADMIN
    const iconStyle: SxProps = {
        fontSize: { xs: '0.7em', md: '0.85em', lg: '0.9em' },
        mr: 0.2
    }

    const routes: Route[] = [
        ...(isAdmin ? [
            {
                path: "/admin/orders",
                icon: <ViewList sx={iconStyle} />,
                text: translation('orderManagement')
            },
            {
                path: "/admin/users",
                icon: <ManageAccounts sx={iconStyle} />,
                text: translation('userManagement')
            }
        ] : []),
        {
            path: "/orders",
            icon: <LocalShipping sx={iconStyle} />,
            text: translation('myOrders')
        }
    ]

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: isMobileOrTablet ? 'column' : 'row',
            pt: isMobileOrTablet ? 2 : 0,
            pl: isMobileOrTablet ? 1 : 0
        }}>
            {routes.map(({ path, icon, text }, index) => router.pathname !== path && (
                <Link
                    key={path}
                    component={NextLink}
                    href={path}
                    underline="none"
                    color="inherit"
                >
                    <IconButton color="inherit" sx={{
                        mr: index !== routes.length - 1 ? 1 : 0.5,
                        '&:hover': {
                            backgroundColor: 'primary.main',
                            borderRadius: '20px'
                        }
                    }}>
                        {icon}

                        <Typography variant="body2" sx={{
                            ml: 1,
                            fontSize: { xs: '0.5em', sm: '0.55em', lg: '0.6em' }
                        }}>
                            {text}
                        </Typography>
                    </IconButton>
                </Link>
            ))}
        </Box>
    )
}

export default Routes
