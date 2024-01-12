import { useQuery } from 'react-query'

import fetchUser from '@/api/user/fetchUser'

const useUser = (userId: string | undefined) => {
    const { data: user } = useQuery('user', () => fetchUser(userId))

    return user
}

export default useUser