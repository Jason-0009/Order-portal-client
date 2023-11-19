import Role from './Role.enum'

type User = {
    id: string;
    providerUserId: string;
    name: string;
    email: string;
    role: Role;
    imageUrl: string;
}

export default User