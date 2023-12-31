import { FC, useState, ChangeEvent, Fragment } from 'react'

import {
    Box, Typography, Divider, List,
    Pagination, ListItem, ListItemAvatar,
    Avatar, ListItemText, Select, MenuItem,
    SelectChangeEvent, TextField, InputAdornment, IconButton
} from '@mui/material'

import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { AccessAlarm, Close } from '@mui/icons-material'

import withAuth from '@/hoc/withAuth'
import withAdminAuth from '@/hoc/withAdminAuth'

import useAuth from '@/hooks/useAuth'
import useUserProfile from '@/hooks/user/useUserProfile'
import useUsers from '@/hooks/user/useUsers'

import updateUserRole from '@/api/user/updateUserRole'

import BackButton from '@/components/common/BackButton'
import CenteredLayout from '@/components/common/CenteredLayout'

import UserRole from '@/types/user/UserRole.enum'

const AdminUsersPage: FC = () => {
    const [searchTerm, setSearchTerm] = useState('')

    const { isAuthenticated } = useAuth()
    const { userProfile } = useUserProfile(isAuthenticated)
    const { currentUsers, currentPage, handlePageChange } = useUsers(searchTerm)
    const { t: translation } = useTranslation()

    const roleTexts: Record<UserRole, string> = {
        [UserRole.USER]: translation('user'),
        [UserRole.ADMIN]: translation('admin')
    }

    const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) =>
        setSearchTerm(event.target.value)

    const handleRoleChange = async (event: SelectChangeEvent, id: string) => {
        const newRole = event?.target.value as UserRole

        await updateUserRole(id, newRole)
    }

    return (
        <CenteredLayout>
            <BackButton location='/' />

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h5" component="h1" fontWeight={700}>
                    {translation('userManagement')}
                </Typography>

                <TextField
                    value={searchTerm}
                    onChange={handleSearchChange}
                    label={translation('search')}
                    variant="outlined"
                    size="small"
                    InputLabelProps={{
                        sx: { fontSize: '0.9em' }
                    }}
                    InputProps={{
                        sx: { borderRadius: '20px' },
                        endAdornment: searchTerm && (
                            <InputAdornment position="end">
                                <IconButton
                                    edge="end"
                                    size="small"
                                    onClick={() => setSearchTerm('')}
                                >
                                    <Close sx={{ fontSize: '0.9em' }} />
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                    sx={{ width: '200px' }}
                />
            </Box>

            <Divider />

            <List sx={{ maxWidth: '40%' }}>
                {Number(currentUsers?.content.length) > 0 ? (
                    currentUsers?.content.map(({ id, name, email, role, imageUrl }, index) => {
                        if (userProfile?.id === id) return null

                        return (
                            <Fragment key={id}>
                                <ListItem sx={{ mb: 1 }}>
                                    <ListItemAvatar>
                                        <Avatar alt={name} src={imageUrl} />
                                    </ListItemAvatar>

                                    <ListItemText primary={name} secondary={email} />

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
                                    </Select>
                                </ListItem>

                                {index !== currentUsers.content.length - 1 && <Divider />}
                            </Fragment>
                        )
                    })) : (
                    <Box display="flex" flexDirection="row" mt={1}>
                        <AccessAlarm sx={{ mr: 1 }} />

                        <Typography variant="body1">
                            {translation('noUsersFound')}
                        </Typography>
                    </Box>
                )}
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

export const getServerSideProps = async ({ locale }: { locale: string }) => ({
    props: {
        ...(await serverSideTranslations(locale))
    }
})

export default withAuth(withAdminAuth(AdminUsersPage))