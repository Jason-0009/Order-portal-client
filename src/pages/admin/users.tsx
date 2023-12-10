import { FC } from 'react'

import { Typography, Divider } from '@mui/material'

import CenteredLayout from '@/components/layout/CenteredLayout'

import BackButton from '@/components/BackButton'

const AdminUsersPage: FC = () => {
    return (
        <CenteredLayout>
            <BackButton />

            <Typography variant="h5" component="h1" fontWeight={700} gutterBottom>
                Gestione utenti
            </Typography>

            <Divider />
        </CenteredLayout>
    )
}

export default AdminUsersPage