import axios from 'axios'

import Cookies from 'js-cookie'

axios.defaults.baseURL = `${process.env.NEXT_PUBLIC_API_URL}/api`
axios.defaults.withCredentials = true

axios.interceptors.request.use((config) => {
    if (config.method === 'GET') return config
    
    const csrfToken = Cookies.get('XSRF-TOKEN')

    console.log(csrfToken)

    config.headers['X-XSRF-TOKEN'] = csrfToken

    return config
})
