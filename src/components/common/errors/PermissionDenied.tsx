import React, { FC } from 'react'

import { Error } from '@mui/icons-material'

import { Box, Typography } from '@mui/material'

import { useTranslation } from 'next-i18next'

const PermissionDenied: FC = () => {
    const { t: translation } = useTranslation()

    return (
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

export default PermissionDenied
