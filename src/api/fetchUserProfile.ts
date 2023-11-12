import axios, { AxiosRequestConfig } from 'axios'

const fetchUser = async (): Promise<User> => {
    const config: AxiosRequestConfig = {
        method: 'GET',
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/users/profile`,
        withCredentials: true
    }

    const { data } = await axios<User>(config)

    return data
}

export default fetchUser
