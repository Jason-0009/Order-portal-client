import { FC, ReactElement } from 'react'

import { Link, IconButton, Typography } from '@mui/material'
import NextLink from 'next/link'

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