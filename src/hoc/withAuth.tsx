import { ComponentType, useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'next-i18next'

import { Button } from '@mui/material'
import { Google } from '@mui/icons-material'

import { RootState } from '@/store'

import { setIsAuthenticated } from '@/slices/authSlice'

import CenteredBox from '@/components/common/CenteredBox'

import getDisplayName from '@/utils/getDisplayName'

const withAuth = <P extends object>(WrappedComponent: ComponentType<P>) => {
    const WithAuth = (props: P) => {
        const isAuthenticated = useSelector((state: RootState) => state.auth)
        const { t: translation } = useTranslation()
        const dispatch = useDispatch()

        useEffect(() => {
            const token = localStorage.getItem('token')

            if (!token) return

            dispatch(setIsAuthenticated(true))
        }, [dispatch])

        const handleAuth = () => window.location.href =
            `${process.env.NEXT_PUBLIC_API_URL}/oauth2/authorization/google`

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
