import { ComponentType } from 'react'
import { useQuery } from 'react-query'

import { AxiosError } from 'axios'

import { useTranslation } from 'next-i18next'

import { Button, CircularProgress, Typography } from '@mui/material'
import { SyncProblem, Google } from '@mui/icons-material'

import checkAuth from '@/api/checkAuth'

import CenteredBox from '@/components/common/layout/CenteredBox'

import getDisplayName from '@/utils/getDisplayName'
import Head from 'next/head'

const withAuth = <P extends object>(WrappedComponent: ComponentType<P>) => {
    const WithAuth = (props: P) => {
        const { t: translation } = useTranslation()

        const { data: isAuthenticated, isLoading, error } = useQuery('auth', checkAuth)
        const axiosError = error as AxiosError | undefined

        const handleAuth = () => window.location.href =
            `${process.env.NEXT_PUBLIC_API_URL}/oauth2/authorization/google`

        if (isLoading) return (
            <>
                <Head>
                    <title>
                        {translation('title')} - {translation('loading')}
                    </title>
                </Head>

                <CenteredBox>
                    <CircularProgress color="error" />
                </CenteredBox>
            </>
        )

        if (axiosError?.code === 'ERR_NETWORK') return (
            <>
                <Head>
                    <title>
                        {translation('title')} - {translation('networkError')}
                    </title>
                </Head>
                <CenteredBox>
                    <SyncProblem color="error" />
                    <Typography>
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
                            fontSize: { xs: '0.7em', sm: '0.75em', md: '0.8em', lg: '0.87em' },
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
