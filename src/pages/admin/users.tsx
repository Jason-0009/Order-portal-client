import { FC, useState, ChangeEvent } from 'react'

import { useDispatch } from 'react-redux'

import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import {
    Box, Typography, Divider, List,
    Pagination, TextField, InputAdornment, IconButton} from '@mui/material'

import { Close } from '@mui/icons-material'

import withAuth from '@/hoc/withAuth'
import withAdminAuth from '@/hoc/withAdminAuth'

import useUsers from '@/hooks/user/useUsers'

import BackButton from '@/components/common/button/BackButton'
import CenteredLayout from '@/components/common/CenteredLayout'
import NoResultsFound from '@/components/common/NoResultsFound'

import UserListItem from '@/components/user/UserListItem'

const AdminUsersPage: FC = () => {
    const [searchTerm, setSearchTerm] = useState('')

    const { t: translation } = useTranslation()

    const { currentUsers, currentPage, handlePageChange } = useUsers(searchTerm)

    const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) =>
        setSearchTerm(event.target.value)

    const clearSearch = () => setSearchTerm('')

    return (
        <CenteredLayout>
            <BackButton location='/' />

            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 2
            }}>
                <Typography variant="h6" component="h1" fontWeight={600}>
                    {translation('userManagement')}
                </Typography>

                <TextField
                    value={searchTerm}
                    onChange={handleSearchChange}
                    label={translation('search')}
                    variant="outlined"
                    size="small"
                    InputLabelProps={{
                        sx: {
                            fontSize: '0.85em',
                            color: 'text.primary',
                            pl: 1,
                            '&.Mui-focused': {
                                color: 'text.secondary'
                            }
                        }
                    }}
                    InputProps={{
                        sx: {
                            borderRadius: '20px',
                            backgroundColor: 'secondary.main',
                            color: 'text.secondary',
                            fontSize: '0.85em',
                            pb: 0.4
                        },
                        endAdornment: searchTerm && (
                            <InputAdornment position="end">
                                <IconButton
                                    edge="end"
                                    size="small"
                                    onClick={clearSearch}
                                >
                                    <Close sx={{ fontSize: '0.85em' }} />
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                    sx={{
                        width: '200px',
                        "& fieldset": {
                            border: 'none'
                        }
                    }}
                />
            </Box>

            <Divider sx={{ mb: 3 }} />

            <List>
                {currentUsers?.content && (
                    currentUsers.content.length > 0 ? currentUsers.content.map(user =>
                        <UserListItem user={user} />) :
                        <NoResultsFound text={translation('noUsersFound')} />
                )}
            </List>

            {Number(currentUsers?.totalPages) > 1 && (
                <Pagination
                    color="secondary"
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