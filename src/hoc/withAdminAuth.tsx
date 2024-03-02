import { ComponentType } from 'react'

import { useQuery } from 'react-query'

import { useTranslation } from 'next-i18next'

import { Error } from '@mui/icons-material'
import { Box, Typography } from '@mui/material'

import checkAuth from '@/api/checkAuth'
import fetchUserProfile from '@/api/user/fetchUserProfile'

import LoadingState from '@/components/common/layout/LoadingState'

import getDisplayName from '@/utils/getDisplayName'

import UserRole from '@/types/user/UserRole.enum'

const withAdminAuth = <P extends object>(WrappedComponent: ComponentType<P>) => {
    const WithAdminAuth = (props: P) => {
        const { t: translation } = useTranslation()

        const { data: isAuthenticated } = useQuery('auth', checkAuth)
        const { data: userProfile, isLoading } = useQuery('userProfile', fetchUserProfile,
            { enabled: !!isAuthenticated, refetchOnWindowFocus: false })

        const isAdmin = userProfile?.role === UserRole.ADMIN

        if (isLoading) return <LoadingState />

        return isAdmin ? <WrappedComponent {...props} /> : (
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh'
            }}>
                <Error color="error" sx={{
                    fontSize: { xs: '1.2em', sm: '1.4em', md: '1.45em', lg: '1.5em' }
                }} />

                <Typography variant="h6" sx={{
                    color: 'text.primary',
                    fontSize: { xs: '0.85em', sm: '0.9em', md: '0.95em', lg: '1.1em' }
                }}>
                    {translation('permissionDenied')}
                </Typography>
            </Box>
        )
    }

    WithAdminAuth.displayName = `WithAdminAuth(${getDisplayName(WrappedComponent)})`

    return WithAdminAuth
}


export default withAdminAuth