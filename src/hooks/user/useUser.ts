import { useQuery } from 'react-query'

import fetchUserProfile from '@/api/user/fetchUserProfile'
import fetchUser from '@/api/user/fetchUser'

const useUser = (userId: string) => {
    const { data: user } = useQuery('user', () => fetchUser(userId))

    return user
}

export default useUser