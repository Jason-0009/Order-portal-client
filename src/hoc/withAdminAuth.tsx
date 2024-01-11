import React, { ComponentType } from 'react'

import { useTranslation } from 'next-i18next'

import { Box, Typography } from '@mui/material'
import { Error } from '@mui/icons-material'

import useUserProfile from '@/hooks/user/useUserProfile'

import getDisplayName from '@/utils/getDisplayName'

import UserRole from '@/types/user/UserRole.enum'


const withAdminAuth = <P extends object>(WrappedComponent: ComponentType<P>) => {
    const WithAdminAuth = (props: P) => {
        const { t: translation } = useTranslation()

        const { userProfile, isLoading } = useUserProfile()

        const isAdmin = userProfile?.role === UserRole.ADMIN

        return isAdmin ? <WrappedComponent {...props} /> : !isLoading && (
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh'
            }}>
                <Error color="error" />

                <Typography variant="h6" color="error">
                    {translation('permissionDenied')}
                </Typography>
            </Box>
        )
    }

    WithAdminAuth.displayName = `WithAdminAuth(${getDisplayName(WrappedComponent)})`

    return WithAdminAuth
}


export default withAdminAuth