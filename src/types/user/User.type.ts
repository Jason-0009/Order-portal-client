import UserRole from './UserRole.enum'

type User = {
    id: string
    name: string
    email: string
    role: UserRole
    imageUrl: string
}

export default User