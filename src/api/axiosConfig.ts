import axios from 'axios'

import { getCookie } from 'cookies-next'

const { defaults, interceptors } = axios

defaults.baseURL = `${process.env.NEXT_PUBLIC_API_URL}/api`
defaults.withCredentials = true

interceptors.request.use((config) => {
    if (config.method === 'GET') return config

    const csrfToken = getCookie('XSRF-TOKEN')

    config.headers['X-XSRF-TOKEN'] = csrfToken

    return config
})
