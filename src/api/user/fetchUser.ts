import axios, { AxiosRequestConfig } from 'axios'

import User from '@/types/user/User.type'

const fetchUser = async (userId: string | undefined): Promise<User> => {
    const config: AxiosRequestConfig = {
        method: 'GET',
        url: `/users/${userId}`
    }

    const { data: user } = await axios<User>(config)

    return user
}

export default fetchUser
