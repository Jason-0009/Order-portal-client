import axios, { AxiosRequestConfig } from 'axios'

import PagedResponse from '@/types/PagedResponse.type'

import User from '@/types/user/User.type'

const fetchUsers = async (page: number): Promise<PagedResponse<User>> => {
    const config: AxiosRequestConfig = {
        method: 'GET',
        url: '/users',
        params: {
            page,
            size: 8
        }
    }

    const { data: users } = await axios<PagedResponse<User>>(config)

    return users
}

export default fetchUsers
