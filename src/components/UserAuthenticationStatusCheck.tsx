import { ReactNode } from 'react'

import { useQuery } from 'react-query'

import { useDispatch, useSelector } from 'react-redux'

import { Box } from '@mui/material'

import { RootState } from '@/store'

import checkAuth from '@/api/checkAuth'
import fetchUserProfile from '@/api/fetchUserProfile'

import { setAuth } from '@/slices/authSlice'
import { setUserProfile } from '@/slices/userProfileSlice'

type UserAuthenticationStatusCheckProps = {
    children: ReactNode
}

const UserAuthenticationStatusCheck: React.FC<UserAuthenticationStatusCheckProps> = ({ children }) => {
    const dispatch = useDispatch()
    const { isAuthenticated } = useSelector((state: RootState) => state.auth)

    const { isLoading: isAuthLoading } = useQuery('auth', checkAuth, {
        onSuccess: (isAuthenticated) => {
            dispatch(setAuth(isAuthenticated))
        }
    })

    const { isLoading: isUserProfileLoading } = useQuery('userProfile', fetchUserProfile, {
        enabled: isAuthenticated,
        onSuccess: (userProfile) => {
            dispatch(setUserProfile(userProfile))
        }
    })

    const isLoading = isAuthLoading || isUserProfileLoading

    return !isLoading && <Box>{children}</Box>
}


export default UserAuthenticationStatusCheck
