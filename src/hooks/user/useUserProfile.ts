import { useQuery } from 'react-query'

<<<<<<< HEAD
import fetchUserProfile from '@/api/user/fetchUserProfile'

const useUserProfile = (isAuthenticated: boolean | undefined) => {
=======
import { useSelector } from 'react-redux'

import { RootState } from '@/store'

import fetchUserProfile from '@/api/user/fetchUserProfile'

const useUserProfile = () => {
    const isAuthenticated = useSelector((state: RootState) => state.auth)
    
>>>>>>> ef4442a7fcd9330fd6d88aff9a36ea616b943c46
    const { data: userProfile, isLoading } = useQuery('userProfile', fetchUserProfile,
        { enabled: !!isAuthenticated })

    return { userProfile, isLoading }
}

export default useUserProfile