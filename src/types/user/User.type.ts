import Role from './Role.enum'

type User = {
    id: string;
    name: string;
    email: string;
    role: Role;
    imageUrl: string;
}

export default User