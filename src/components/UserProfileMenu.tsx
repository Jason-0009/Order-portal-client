import { FC, MouseEvent } from 'react'

import User from '@/types/user/User.type'

import { Avatar, Box, Button, Divider, IconButton, Popover, Typography } from '@mui/material'

type UserProfileMenuProps = {
    userProfile: User,
    handleMenuOpen: (event: MouseEvent<HTMLElement>) => void,
    anchorElement: HTMLElement | undefined,
    handleMenuClose: () => void,
    handleLogout: () => void
}

const UserProfileMenu: FC<UserProfileMenuProps> = ({ userProfile, handleMenuOpen, anchorElement, handleMenuClose, handleLogout }) => {
    const { imageUrl, name, email } = userProfile

    return (
        <>
            <IconButton color="inherit" onClick={handleMenuOpen}>
                <Avatar src={imageUrl} />
            </IconButton>

            <Popover
                open={Boolean(anchorElement)}
                anchorEl={anchorElement}
                onClose={handleMenuClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
            >
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
            </Popover>
        </>
    )
}

export default UserProfileMenu