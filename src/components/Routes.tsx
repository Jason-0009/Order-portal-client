import { FC } from 'react'
import { useQuery } from 'react-query'

import { useRouter } from 'next/router'
import NextLink from 'next/link'
import { useTranslation } from 'next-i18next'

import { Link, IconButton, Typography } from '@mui/material'
import { LocalShipping, ManageAccounts, ViewList } from '@mui/icons-material'

import checkAuth from '@/api/checkAuth'

import fetchUserProfile from '@/api/user/fetchUserProfile'

import UserRole from '@/types/user/UserRole.enum'
import Route from '@/types/Route.type'

const Routes: FC = () => {
    const router = useRouter()

    const { data: isAuthenticated } = useQuery('auth', checkAuth)
    const { data: userProfile } = useQuery('userProfile', fetchUserProfile,
        { enabled: !!isAuthenticated })
        
    const { t: translation } = useTranslation()

    const isAdmin = userProfile?.role === UserRole.ADMIN
    const iconStyle = { mr: 0.2, fontSize: '0.8em' }

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
        <>
            {routes.map(({ path, icon, text }) => router.pathname !== path && (
                <Link
                    key={path}
                    component={NextLink}
                    href={path}
                    underline="none"
                    color="inherit"
                    justifyContent={'center'}
                >
                    <IconButton color="inherit" sx={{ mr: 1 }} disableRipple>
                        {icon}

                        <Typography variant="body2" ml={0.5}>
                            {text}
                        </Typography>
                    </IconButton>
                </Link>
            ))}
        </>
    )
}

export default Routes
