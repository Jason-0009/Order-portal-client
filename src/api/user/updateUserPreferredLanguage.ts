import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

const updateUserPreferredLanguage = async (userId: string, preferredLanguage: string): Promise<AxiosResponse> => {
    const config: AxiosRequestConfig = {
        method: 'PUT',
        url: `/users/${userId}/preferredLanguage`,
        data: preferredLanguage,
        headers: { 'Content-Type': 'text/plain' }
    }

    return await axios(config)
}

export default updateUserPreferredLanguage
