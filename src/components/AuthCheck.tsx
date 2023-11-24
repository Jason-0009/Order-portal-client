import { ReactNode } from 'react'
import { useQuery } from 'react-query'
import { useDispatch, useSelector } from 'react-redux'

import { RootState } from '@/store'

import checkAuth from '@/api/checkAuth'
import fetchUserProfile from '@/api/fetchUserProfile'

import { setAuth } from '@/slices/authSlice'
import { setUserProfile } from '@/slices/userProfileSlice'

type AuthCheckProps = {
    children: ReactNode
}

const AuthCheck: React.FC<AuthCheckProps> = ({ children }) => {
    const dispatch = useDispatch()
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated)

    useQuery('auth', checkAuth, {
        onSuccess: (isAuthenticated) => dispatch(setAuth(isAuthenticated))
    })

    const { isLoading: isProfileLoading } = useQuery('userProfile', fetchUserProfile, {
        enabled: isAuthenticated,
        onSuccess: (userProfile) => dispatch(setUserProfile(userProfile))
    })

    return !isProfileLoading ? <>{children}</> : null
}

export default AuthCheck
