import { FC } from 'react'
import { useQuery } from 'react-query'

import { useTranslation } from 'next-i18next'
import NextLink from 'next/link'
import { useRouter } from 'next/router'

import { LocalShipping, ManageAccounts, ViewList } from '@mui/icons-material'
import {
    Box,
    IconButton,
    Link,
    SxProps,
    Typography
} from '@mui/material'

import checkAuth from '@/api/checkAuth'

import fetchUserProfile from '@/api/user/fetchUserProfile'

import Route from '@/types/Route.type'
import UserRole from '@/types/user/UserRole.enum'

const Routes: FC = () => {
    const router = useRouter()

    const { data: isAuthenticated } = useQuery('auth', checkAuth)
    const { data: userProfile } = useQuery('userProfile', fetchUserProfile,
        { enabled: !!isAuthenticated })

    const { t: translation } = useTranslation()

    const isAdmin = userProfile?.role === UserRole.ADMIN
    const iconStyle: SxProps = {
        fontSize: { xs: '0.65em', sm: '0.75em', md: '0.85em', lg: '0.9em' },
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
            flexDirection: { xs: 'column', lg: 'row' },
            pt: { xs: 2, lg: 0 },
            pl: { xs: 0.5, sm: 0.8, md: 0.5, lg: 0 }
        }}>
            {routes.map(({ path, icon, text }, index) => (
                <Link
                    key={path}
                    component={NextLink}
                    href={path}
                    underline="none"
                    color="inherit"
                >
                    <IconButton color="inherit" disableRipple sx={{
                        mr: index !== routes.length - 1 ? 1 : 0.5
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
