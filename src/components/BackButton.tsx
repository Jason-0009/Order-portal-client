import { FC } from 'react'
import NextLink from 'next/link'

import { Link, IconButton, Typography } from '@mui/material'

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'

type BackButtonProps = {
    href: string
}

const BackButton: FC<BackButtonProps> = ({ href }) => (
    <Link component={NextLink} href={href} color="grey.600" mb={2}>
        <IconButton edge="start" color="inherit" aria-label="back" disableRipple>
            <ArrowBackIosIcon />

            <Typography variant="body2">
                Indietro
            </Typography>
        </IconButton>
    </Link>
)

export default BackButton
