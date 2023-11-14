import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'

import { RootState } from '@/store'

export const useAuth = () => {
    const router = useRouter()
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated)

    useEffect(() => {
        if (!isAuthenticated) router.push('/')
    }, [isAuthenticated])
}