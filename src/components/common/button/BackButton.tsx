import { FC } from 'react'

import { useRouter } from 'next/router'

import { useTranslation } from 'next-i18next'

import { Box, IconButton, SxProps, Typography } from '@mui/material'
import { ArrowBackIos } from '@mui/icons-material'

type BackButtonProps = {
    location: string
}

const BackButton: FC<BackButtonProps> = ({ location }) => {
    const router = useRouter()

    const { t: translation } = useTranslation()

    const fontSizeStyle: SxProps = { fontSize: { xs: '0.45em', sm: '0.5em', md: '0.55m', lg: '0.58em' } }

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
                <ArrowBackIos sx={fontSizeStyle} />

                <Typography variant="body2" fontWeight={600} sx={fontSizeStyle}>
                    {translation('back')}
                </Typography>
            </IconButton>
        </Box>
    )
}

export default BackButton
