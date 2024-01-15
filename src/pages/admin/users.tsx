import { FC, useState, ChangeEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import Head from 'next/head'

import {
    Box, Typography, Divider, List,
    Pagination, TextField, InputAdornment,
    IconButton, CircularProgress, Snackbar, Alert
} from '@mui/material'

import { Close } from '@mui/icons-material'

import withAuth from '@/hoc/withAuth'
import withAdminAuth from '@/hoc/withAdminAuth'

import { RootState } from '@/store'

import useUsers from '@/hooks/useUsers'

import { hideUsersSnackbar } from '@/slices/snackbar/usersSnackbarSlice'

import BackButton from '@/components/common/button/BackButton'
import CenteredLayout from '@/components/common/layout/CenteredLayout'
import PageTitle from '@/components/common/page/PageTitle'
import PageHeader from '@/components/common/page/PageHeader'
import NoResultsFound from '@/components/common/NoResultsFound'
import CenteredBox from '@/components/common/layout/CenteredBox'

import UserListItem from '@/components/user/UserListItem'
import PaginationComponent from '@/components/common/PaginationComponent'

const AdminUsersPage: FC = () => {
    const { open, message } = useSelector((state: RootState) => state.usersSnackbar)
    const dispatch = useDispatch()
    const [searchTerm, setSearchTerm] = useState('')
    const { t: translation } = useTranslation()

    const { currentUsers, isLoading, currentPage, handlePageChange } = useUsers(searchTerm)

    const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) =>
        setSearchTerm(event.target.value)

    const clearSearch = () => setSearchTerm('')

    const handleCloseSnackbar = () => dispatch(hideUsersSnackbar())

    if (isLoading) return (
        <CenteredBox>
            <CircularProgress color="error" />
        </CenteredBox>
    )

    return (
        <>
            <Head>
                <title>
                    {translation('title')} - {translation('userManagement')}
                </title>
            </Head>

            <CenteredLayout>
                <BackButton location='/' />

                <PageHeader>
                    <PageTitle text={translation('userManagement')} />

                    <TextField
                        value={searchTerm}
                        onChange={handleSearchChange}
                        label={translation('search')}
                        variant="outlined"
                        size="small"
                        InputLabelProps={{
                            sx: {
                                fontSize: { xs: '0.7em', sm: '0.75em', md: '0.8em', lg: '0.85em' },
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
                                fontSize: { xs: '0.7em', sm: '0.75em', md: '0.8em', lg: '0.85em' },
                                pb: 0.4
                            },
                            endAdornment: searchTerm && (
                                <InputAdornment position="end">
                                    <IconButton
                                        edge="end"
                                        size="small"
                                        onClick={clearSearch}
                                    >
                                        <Close sx={{
                                            fontSize: { xs: '0.7em', sm: '0.75em', md: '0.8em', lg: '0.85em' }
                                        }} />
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                        sx={{
                            mt: { xs: 1, sm: 0 },
                            width: { xs: '160px', sm: '170px', md: '180px', lg: '200px' },
                            "& fieldset": {
                                border: 'none'
                            }
                        }}
                    />
                </PageHeader>

                <Divider sx={{ mb: 3 }} />

                <List>
                    {currentUsers?.content && (
                        currentUsers.content.length > 0 ? currentUsers.content.map(user =>
                            <UserListItem key={user.id} user={user} />
                        ) : <NoResultsFound text={translation('noUsersFound')} />
                    )}
                </List>

                {Number(currentUsers?.totalPages) > 1 && (
                    <PaginationComponent
                        count={currentUsers?.totalPages}
                        page={currentPage}
                        onChange={handlePageChange}
                        sx={{
                            justifyContent: { xs: 'center', sm: 'start' },
                            mt: 1
                        }}
                    />
                )}

                <Snackbar
                    open={open}
                    autoHideDuration={6000}
                    onClose={handleCloseSnackbar}
                >
                    <Alert
                        onClose={handleCloseSnackbar}
                        severity="success"
                        sx={{ width: '100%' }}
                    >
                        {message}
                    </Alert>
                </Snackbar>
            </CenteredLayout>
        </>
    )
}

export const getServerSideProps = async ({ locale }: { locale: string }) => ({
    props: {
        ...(await serverSideTranslations(locale))
    }
})

export default withAuth(withAdminAuth(AdminUsersPage))