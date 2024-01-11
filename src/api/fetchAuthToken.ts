import axios, { AxiosRequestConfig } from 'axios'

const fetchAuthToken = async (): Promise<string> => {
    const config: AxiosRequestConfig = {
        method: 'GET',
        url: '/auth/token'
    }

    const { data: token } = await axios<string>(config)

    return token
}

export default fetchAuthToken
