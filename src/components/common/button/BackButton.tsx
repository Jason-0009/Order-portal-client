import { FC } from 'react'

import { useRouter } from 'next/router'

import { useTranslation } from 'next-i18next'

import { ArrowBackIos } from '@mui/icons-material'
import { Box, IconButton, SxProps, Typography } from '@mui/material'

type BackButtonProps = {
    location: string
}

const BackButton: FC<BackButtonProps> = ({ location }) => {
    const router = useRouter()

    const { t: translation } = useTranslation()

    const fontStyle: SxProps = {
        fontWeight: 600,
        fontSize: { xs: '0.45em', sm: '0.5em', md: '0.55m', lg: '0.58em' }
    }

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
                <ArrowBackIos sx={fontStyle} />

                <Typography variant="body2" sx={fontStyle}>
                    {translation('back')}
                </Typography>
            </IconButton>
        </Box>
    )
}

export default BackButton
