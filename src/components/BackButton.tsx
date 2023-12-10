import { FC } from 'react'
import { useRouter } from 'next/router'

import { Box, IconButton, Typography } from '@mui/material'

import { ArrowBackIos} from '@mui/icons-material'

const BackButton: FC = () => {
    const router = useRouter()

    const goBack = () => router.back()

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
                    Indietro
                </Typography>
            </IconButton>
        </Box>
    )
}

export default BackButton
