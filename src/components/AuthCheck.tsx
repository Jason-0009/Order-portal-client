import { ReactNode } from 'react'
import { useQuery } from 'react-query'
import { useDispatch } from 'react-redux'

import checkAuth from '@/api/checkAuth'

import { setAuth } from '@/slices/authSlice'

type AuthCheckProps = {
    children: ReactNode
}

const AuthCheck: React.FC<AuthCheckProps> = ({ children }) => {
    const dispatch = useDispatch()

    const { isLoading } = useQuery('auth', async () => {
        const isAuthenticated = await checkAuth()
        
        dispatch(setAuth(isAuthenticated))
    })

    return isLoading ? null : <>{children}</>
}

export default AuthCheck
