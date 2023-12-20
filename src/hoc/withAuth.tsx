import { FC, useEffect } from 'react'

import { useRouter } from 'next/router'

import useAuth from '@/hooks/useAuth'

const withAuth = (WrappedComponent: FC) => {
    return (props: any) => {
        const router = useRouter()
        const { isAuthenticated, isLoading } = useAuth()

        useEffect(() => {
            if (isLoading || isAuthenticated) return

            router.push('/')
        }, [isAuthenticated])

        return isAuthenticated && <WrappedComponent {...props} />
    }
}

export default withAuth