import axios from 'axios'

import { getCookie } from 'cookies-next'

axios.defaults.baseURL = `${process.env.NEXT_PUBLIC_API_URL}/api`

axios.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')

    if (!token) return config

    config.headers['Authorization'] = `Bearer ${token}`

    if (config.method !== 'GET') {
        const csrfToken = getCookie('XSRF-TOKEN')
        config.headers['X-XSRF-TOKEN'] = csrfToken
    }

    return config
})
