import { useQuery } from 'react-query'

import fetchUserProfile from '@/api/user/fetchUserProfile'

const useUserProfile = (isAuthenticated: boolean | undefined) => {
    const { data: userProfile, isLoading } = useQuery('userProfile', fetchUserProfile,
        { enabled: !!isAuthenticated })

    return { userProfile, isLoading }
}

export default useUserProfile