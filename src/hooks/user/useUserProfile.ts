import { useQuery } from 'react-query'

import { useSelector } from 'react-redux'

import { RootState } from '@/store'

import fetchUserProfile from '@/api/user/fetchUserProfile'

const useUserProfile = () => {
    const isAuthenticated = useSelector((state: RootState) => state.auth)
    
    const { data: userProfile, isLoading } = useQuery('userProfile', fetchUserProfile,
        { enabled: !!isAuthenticated })

    return { userProfile, isLoading }
}

export default useUserProfile