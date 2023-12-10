import axios from 'axios'

import { getCookie } from 'cookies-next'

axios.defaults.baseURL = `${process.env.NEXT_PUBLIC_API_URL}/api`
axios.defaults.withCredentials = true

axios.interceptors.request.use((config) => {
    if (config.method === 'GET') return config
    
    const csrfToken = getCookie('XSRF-TOKEN')

    config.headers['X-XSRF-TOKEN'] = csrfToken

    return config
})
