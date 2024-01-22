import { ComponentType } from 'react'
import { useQuery } from 'react-query'

import { AxiosError } from 'axios'

import { useTranslation } from 'next-i18next'

import Head from 'next/head'

import { Google, SyncProblem } from '@mui/icons-material'
import { Button, Typography } from '@mui/material'

import checkAuth from '@/api/checkAuth'

import CenteredBox from '@/components/common/layout/CenteredBox'
import LoadingState from '@/components/common/layout/LoadingState'

import getDisplayName from '@/utils/getDisplayName'

const withAuth = <P extends object>(WrappedComponent: ComponentType<P>) => {
    const WithAuth = (props: P) => {
        const { t: translation } = useTranslation()

        const { data: isAuthenticated, isLoading, error } = useQuery('auth', checkAuth)
        const axiosError = error as AxiosError | undefined

        const handleAuth = () => window.location.href =
            `${process.env.NEXT_PUBLIC_API_URL}/oauth2/authorization/google`

        if (isLoading) return <LoadingState />

        if (axiosError?.code === 'ERR_NETWORK') return (
            <>
                <Head>
                    <title>
                        {translation('title')} - {translation('networkError')}
                    </title>
                </Head>

                <CenteredBox>
                    <SyncProblem color="error" sx={{
                        fontSize: { xs: '1.2em', sm: '1.4em', md: '1.45em', lg: '1.5em' }
                    }} />

                    <Typography sx={{
                        fontSize: { xs: '0.85em', sm: '0.9em', md: '0.95em', lg: '1em' }
                    }}>
                        {translation('connectionErrorMessage')}
                    </Typography>
                </CenteredBox>
            </>
        )

        if (isAuthenticated === false) return (
            <>
                <Head>
                    <title>
                        {translation('title')} - {translation('signIn')}
                    </title>
                </Head>

                <CenteredBox>
                    <Button
                        onClick={handleAuth}
                        sx={{
                            fontSize: { xs: '0.75em', sm: '0.8em', md: '0.85em', lg: '0.87em' },
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
            </>
        )

        return <WrappedComponent {...props} />
    }

    WithAuth.displayName = `WithAuth(${getDisplayName(WrappedComponent)})`

    return WithAuth
}

export default withAuth
