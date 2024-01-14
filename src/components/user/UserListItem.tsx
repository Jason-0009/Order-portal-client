import { FC } from 'react'
import { useQuery } from 'react-query'
import { useDispatch } from 'react-redux'

import { useTranslation } from 'next-i18next'

import {
    Avatar, ListItem, ListItemAvatar,
    ListItemText, MenuItem, Select, SelectChangeEvent
} from '@mui/material'

import { showUsersSnackbar } from '@/slices/snackbar/usersSnackbarSlice'

import checkAuth from '@/api/checkAuth'
import fetchUserProfile from '@/api/user/fetchUserProfile'
import updateUserRole from '@/api/user/updateUserRole'

import User from '@/types/user/User.type'

import UserRole from '@/types/user/UserRole.enum'

type UserListItemProps = {
    user: User
}

const UserListItem: FC<UserListItemProps> = ({ user }) => {
    const dispatch = useDispatch()
    const { t: translation } = useTranslation()

    const { data: isAuthenticated } = useQuery('auth', checkAuth)
    const { data: userProfile } = useQuery('userProfile', fetchUserProfile,
        { enabled: !!isAuthenticated })
        
    const roleTexts: Record<UserRole, string> = {
        [UserRole.USER]: translation('user'),
        [UserRole.ADMIN]: translation('admin')
    }

    const handleRoleChange = async (event: SelectChangeEvent) => {
        const newRole = event?.target.value as UserRole

        await updateUserRole(user.id, newRole)

        dispatch(showUsersSnackbar(translation('roleUpdatedSuccessfully')))
    }

    if (userProfile?.id === user.id) return null

    return (
        <ListItem sx={theme => ({
            maxWidth: '500px',
            mb: 3,
            backgroundColor: 'secondary.main',
            borderRadius: '20px',
            boxShadow: `0px 4px 4px 0px ${theme.palette.secondary.main}`
        })}>
            <ListItemAvatar>
                <Avatar alt={user.name} src={user.imageUrl} />
            </ListItemAvatar>

            <ListItemText primary={user.name} secondary={user.email} />

            <Select
                value={user.role}
                onChange={handleRoleChange}
                sx={{
                    height: '35px',
                    borderRadius: '10px',
                    fontSize: '0.85em',
                    backgroundColor: 'primary.main',
                    "& fieldset": {
                        border: 'none'
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
                                backgroundColor: 'primary.main',
                                fontSize: '0.85em',
                                '&.MuiMenuItem-root': {
                                    marginTop: isFirstItem ? '-0.6em' : 'auto',
                                    marginBottom: isLastItem ? '-0.6em' : 'auto',
                                    '&.Mui-selected': {
                                        backgroundColor: 'primary.main'
                                    },
                                    '&:hover': {
                                        backgroundColor: 'secondary.main'
                                    }
                                }
                            }}
                        >
                            {roleTexts[role]}
                        </MenuItem>
                    )
                })}
            </Select>
        </ListItem >
    )
}

export default UserListItem