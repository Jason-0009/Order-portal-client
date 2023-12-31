import React, { ComponentType } from 'react'

import { Box, Typography } from '@mui/material'
import { Error } from '@mui/icons-material'

import useAuth from '@/hooks/useAuth'
import useUserProfile from '@/hooks/user/useUserProfile'

import UserRole from '@/types/user/UserRole.enum'

const withAdminAuth = <P extends object>(WrappedComponent: ComponentType<P>) => {
    return (props: P) => {
        const { isAuthenticated } = useAuth()
        const { userProfile, isLoading } = useUserProfile(isAuthenticated)

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
                    Non hai il permesso per visualizzare questa pagina.
                </Typography>
            </Box>
        )
    }
}

export default withAdminAuth