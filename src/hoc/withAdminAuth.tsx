import React, { FC } from 'react'

import { useSelector } from 'react-redux'

import { Box, Typography } from '@mui/material'

import { Error } from '@mui/icons-material'

import { RootState } from '@/store'

import Role from '@/types/user/Role.enum'

const withAdminAuth = (WrappedComponent: FC) => {
    return (props: any) => {
        const userProfile = useSelector((state: RootState) => state.userProfile)
        const isAdmin = userProfile?.role === Role.ADMIN

        return isAdmin ? <WrappedComponent {...props} /> : <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh'
            }}
        >
            <Error color="error" />

            <Typography variant="h6" color="error">
                Non hai il permesso per visualizzare questa pagina.
            </Typography>
        </Box>
    }
}

export default withAdminAuth