import { FC, Fragment } from 'react'

import {
    Typography, Divider, List,
    Pagination, ListItem, ListItemAvatar,
    Avatar, ListItemText, Select, MenuItem, SelectChangeEvent
} from '@mui/material'

import withAuth from '@/hoc/withAuth'
import withAdminAuth from '@/hoc/withAdminAuth'

import useAuth from '@/hooks/useAuth'
import useUsers from '@/hooks/user/useUsers'

import updateUserRole from '@/api/user/updateUserRole'

import BackButton from '@/components/common/BackButton'

import CenteredLayout from '@/components/common/CenteredLayout'

import UserRole from '@/types/user/UserRole.enum'
import useUserProfile from '@/hooks/user/useUserProfile'

const AdminUsersPage: FC = () => {
    const { isAuthenticated } = useAuth()
    const { userProfile } = useUserProfile(isAuthenticated)

    const {
        currentUsers,
        currentPage,
        handlePageChange
    } = useUsers()

    const roleTexts: Record<UserRole, string> = {
        [UserRole.USER]: 'Utente',
        [UserRole.ADMIN]: 'Amministratore'
    }

    const handleRoleChange = async (event: SelectChangeEvent, id: string) => {
        const newRole = event?.target.value as UserRole

        await updateUserRole(id, newRole)
    }

    return (
        <CenteredLayout>
            <BackButton />

            <Typography variant="h5" component="h1" fontWeight={700} gutterBottom>
                Gestione utenti
            </Typography>

            <Divider />

            <List sx={{ maxWidth: '40%' }}>
                {currentUsers?.content.map(({ id, name, email, role, imageUrl }, index) => (
                    <Fragment key={id}>
                        <ListItem sx={{ mb: 1 }}>
                            <ListItemAvatar>
                                <Avatar alt={name} src={imageUrl} />
                            </ListItemAvatar>

                            <ListItemText primary={name} secondary={email} />

                            {userProfile?.id !== id && (
                                <Select
                                    value={role}
                                    onChange={event => handleRoleChange(event, id)}
                                    sx={{
                                        height: '40px',
                                        borderRadius: '10px',
                                        fontSize: '0.85em',
                                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                            border: `1px solid red`,
                                        }
                                    }}
                                >
                                    {Object.values(UserRole).map((role, index, array) => {
                                        const isFirstItem = index === 0
                                        const isLastItem = index === array.length - 1

                                        return (
                                            <MenuItem
                                                key={role}
                                                value={role}
                                                sx={{
                                                    fontSize: '0.85em',
                                                    '&.MuiMenuItem-root': {
                                                        marginTop: isFirstItem ? '-0.55em' : 'auto',
                                                        marginBottom: isLastItem ? '-0.55em' : 'auto'
                                                    }
                                                }}
                                            >
                                                {roleTexts[role]}
                                            </MenuItem>
                                        )
                                    })}
                                </Select>)}
                        </ListItem>

                        {index !== currentUsers.content.length - 1 && <Divider />}
                    </Fragment>
                ))}
            </List>

            {Number(currentUsers?.totalPages) > 1 && (
                <Pagination
                    color="primary"
                    count={currentUsers?.totalPages}
                    page={currentPage}
                    onChange={handlePageChange}
                />
            )}
        </CenteredLayout>
    )
}

export default withAuth(withAdminAuth(AdminUsersPage))