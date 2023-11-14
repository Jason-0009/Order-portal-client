import axios, { AxiosRequestConfig } from 'axios'

const fetchUser = async (): Promise<User> => {
    const config: AxiosRequestConfig = {
        method: 'GET',
        url: '/users/profile',
    }

    const { data } = await axios<User>(config)

    return data
}

export default fetchUser
