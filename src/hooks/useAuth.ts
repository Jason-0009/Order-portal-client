import { useQuery } from 'react-query'

import { AxiosError } from 'axios'

import checkAuth from '@/api/checkAuth'

const useAuth = () => {
    const { data: isAuthenticated, isLoading, error } = useQuery('auth', checkAuth)
    const axiosError = error as AxiosError | undefined

    return { isAuthenticated, isLoading, axiosError }
}

export default useAuth