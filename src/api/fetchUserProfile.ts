import axios, { AxiosRequestConfig } from 'axios'

import User from '@/types/user/User.type'

const fetchUser = async (): Promise<User> => {
    const config: AxiosRequestConfig = {
        method: 'GET',
        url: '/users/profile',
    }

    const { data: userProfile } = await axios<User>(config)

    return userProfile
}

export default fetchUser
