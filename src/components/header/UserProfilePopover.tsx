import React, { FC } from 'react'

import { Box, Typography, Button, Divider } from '@mui/material'

import User from '@/types/user/User.type'

type UserProfilePopoverProps = {
    userProfile: User,
    handleLogout: () => void
}

const UserProfilePopover: FC<UserProfilePopoverProps> = ({ userProfile, handleLogout }) => {
    const { name, email } = userProfile

    return (
        <Box sx={{ padding: 2, width: 200 }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
                {name}
            </Typography>

            <Typography variant="body2" color="text.secondary">
                {email}
            </Typography>

            <Divider sx={{ my: 1 }} />

            <Button onClick={handleLogout} variant="contained" color="primary" fullWidth>
                Esci
            </Button>
        </Box>
    )
}

export default UserProfilePopover