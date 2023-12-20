import axios, { AxiosResponse, AxiosRequestConfig } from 'axios'

import UserRole from '@/types/user/UserRole.enum'

const updateUserRole = async (userId: string, role: UserRole): Promise<AxiosResponse> => {
    const config: AxiosRequestConfig = {
        method: 'PUT',
        url: `/users/${userId}`,
        data: JSON.stringify(role),
        headers: { 'Content-Type': 'application/json' }
    }

    return await axios(config)
}

export default updateUserRole
