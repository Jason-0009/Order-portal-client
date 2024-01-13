import { ComponentType } from 'react'

const getDisplayName = (WrappedComponent: ComponentType<any>) =>
    WrappedComponent.displayName || WrappedComponent.name || 'Component'

export default getDisplayName