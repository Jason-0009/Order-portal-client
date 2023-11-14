import { FC } from 'react'

import { useAuth } from '@/hooks/useAuth'

const withAuth = (WrappedComponent: FC<any>) => {
    const Wrapper: FC<any> = (props) => {
        useAuth()

        return <WrappedComponent {...props} />
    }

    return Wrapper
}

export default withAuth
