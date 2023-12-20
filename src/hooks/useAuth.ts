import { useQuery } from 'react-query'

import checkAuth from '@/api/checkAuth'

const useAuth = () => {
    const { data: isAuthenticated, isLoading } = useQuery('auth', checkAuth)

    return { isAuthenticated, isLoading }
}

export default useAuth