import { ComponentType } from 'react'

import { useTranslation } from 'next-i18next'

import { Button, CircularProgress, Typography } from '@mui/material'
import { SyncProblem, Google } from '@mui/icons-material'

import useAuth from '@/hooks/useAuth'

import CenteredBox from '@/components/common/CenteredBox'

import getDisplayName from '@/utils/getDisplayName'

const withAuth = <P extends object>(WrappedComponent: ComponentType<P>) => {
    const WithAuth = (props: P) => {
        const { t: translation } = useTranslation()

        const { isAuthenticated, isLoading, axiosError } = useAuth()

        const handleAuth = () => window.location.href =
            `${process.env.NEXT_PUBLIC_API_URL}/oauth2/authorization/google`

        if (isLoading) return (
            <CenteredBox>
                <CircularProgress color="error" />
            </CenteredBox>
        )

        if (axiosError?.code === 'ERR_NETWORK') return (
            <CenteredBox>
                <SyncProblem color="error" />

                <Typography>
                    {translation('connectionErrorMessage')}
                </Typography>
            </CenteredBox>
        )

        if (!isAuthenticated) return (
            <CenteredBox>
                <Button
                    onClick={handleAuth}
                    sx={{
                        backgroundColor: 'secondary.main',
                        color: 'text.primary',
                        borderRadius: '20px',
                        fontWeight: 600,
                        textTransform: 'none',
                        padding: '10px 24px'
                    }}
                    startIcon={<Google />}
                >
                    {translation('signInButtonLabel')}
                </Button>
            </CenteredBox>
        )

        return <WrappedComponent {...props} />
    }

    WithAuth.displayName = `WithAuth(${getDisplayName(WrappedComponent)})`

    return WithAuth
}

export default withAuth
