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
        { enabled: !!isAuthenticated, refetchOnWindowFocus: false })

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
            textAlign: { xs: 'center', sm: 'start' },
            maxWidth: '500px',
            mb: 3,
            backgroundColor: 'secondary.main',
            borderRadius: '20px',
            boxShadow: `0px 4px 4px 0px ${theme.palette.secondary.main}`,
            flexDirection: { xs: 'column', sm: 'row' },
        })}>
            <ListItemAvatar>
                <Avatar alt={user.name} src={user.imageUrl} sx={{
                    width: { xs: 30, sm: 32, md: 35, lg: 40 },
                    height: { xs: 30, sm: 32, md: 35, lg: 40 },
                    mt: { xs: 1, sm: 0 },
                    ml: { xs: 1, sm: 0 }
                }} />
            </ListItemAvatar>

            <ListItemText
                primary={user.name}
                secondary={user.email} primaryTypographyProps={{
                    sx: {
                        fontSize: { xs: '0.85em', sm: '0.9em', md: '0.95em', lg: '1em' }
                    }
                }}
                secondaryTypographyProps={{
                    sx: {
                        fontSize: { xs: '0.75em', sm: '0.8em', md: '0.85em', lg: '0.9em' },
                        ml: { xs: 1, sm: 0 }
                    }
                }}
                sx={{
                    ml: { xs: '-0.8em', sm: '-0.6em', md: '-0.4em', lg: 0 },
                    mb: 1,
                }}
            />

            <Select
                value={user.role}
                onChange={handleRoleChange}
                sx={{
                    height: { xs: '25px', sm: '30px', md: '32px', lg: '35px' },
                    borderRadius: '10px',
                    fontSize: { xs: '0.7em', sm: '0.75em', md: '0.8em', lg: '0.85em' },
                    backgroundColor: 'primary.main',
                    mb: { xs: 1, sm: 0 },
                    mr: { xs: 1, sm: 0 },
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
                                fontSize: { xs: '0.7em', sm: '0.75em', md: '0.8em', lg: '0.85em' },
                                '&.MuiMenuItem-root': {
                                    marginTop: isFirstItem ? { xs: '-0.7em', sm: '-0.65em', md: '-0.6em', lg: '-0.55em' } : 'auto',
                                    marginBottom: isLastItem ? { xs: '-0.75em', sm: '-0.65em', md: '-0.6em', lg: '-0.55em' } : 'auto',
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