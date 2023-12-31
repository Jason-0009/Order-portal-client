import { FC } from 'react'

import { useRouter } from 'next/router'

import { useTranslation } from 'next-i18next'

import { Box, IconButton, Typography } from '@mui/material'
import { ArrowBackIos } from '@mui/icons-material'

type BackButtonProps = {
    location: string
}

const BackButton: FC<BackButtonProps> = ({ location }) => {
    const router = useRouter()

    const { t: translation } = useTranslation()

    const goBack = () => router.push(location)

    return (
        <Box>
            <IconButton
                edge="start"
                color="inherit"
                onClick={goBack}
                disableRipple
                sx={{ mb: 2 }}
            >
                <ArrowBackIos />

                <Typography variant="body2">
                    {translation('back')}
                </Typography>
            </IconButton>
        </Box>
    )
}

export default BackButton
