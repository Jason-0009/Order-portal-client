import React, { FC } from 'react'

import { Box, Typography, Button, Divider } from '@mui/material'

type UserProfilePopoverProps = {
    userProfile: User | undefined,
    handleLogout: () => void
}

const UserProfilePopover: FC<UserProfilePopoverProps> = ({ userProfile, handleLogout }) => (
    <Box sx={{ padding: 2, width: 200 }}>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
            {userProfile?.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
            {userProfile?.email}
        </Typography>
        <Divider sx={{ my: 1 }} />
        <Button onClick={handleLogout} variant="contained" color="primary" fullWidth>
            Esci
        </Button>
    </Box>
)

export default UserProfilePopover