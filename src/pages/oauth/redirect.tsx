import { FC, useEffect } from 'react'

import { useRouter } from 'next/router'

const RedirectPage: FC = () => {
    const router = useRouter()

    useEffect(() => {
        const token = router.query.token as string | undefined

        if (!token) return

        const preferredLanguage = router.query.preferredLanguage as string | undefined

        localStorage.setItem('token', token)

        router.push(`/${preferredLanguage || '/'}`)
    }, [router.query])

    return null
}

export default RedirectPage
