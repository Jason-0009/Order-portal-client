import { FC, ReactElement } from 'react'

import NextLink from 'next/link'

import { Link, IconButton, Typography } from '@mui/material'

type HeaderLinkButtonProps = {
    href: string,
    icon: ReactElement,
    text: string
}

const HeaderLinkButton: FC<HeaderLinkButtonProps> = ({ href, icon, text }) => (
    <Link component={NextLink} href={href} underline="none" color="inherit" justifyContent={'center'}>
        <IconButton color="inherit" disableRipple>
            {icon}

            <Typography variant="body1" sx={{ fontWeight: 600 }}>
                {text}
            </Typography>
        </IconButton>
    </Link>
)

export default HeaderLinkButton