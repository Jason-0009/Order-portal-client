import { FC, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'

const withAuth = (WrappedComponent: FC) => {
    return (props: any) => {
        const router = useRouter()
        const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated)

        useEffect(() => {
            if (!isAuthenticated) router.push('/')
        }, [isAuthenticated])

        return isAuthenticated && <WrappedComponent {...props} />
    }
}

export default withAuth