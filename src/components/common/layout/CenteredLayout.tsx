import { FC, ReactNode } from 'react'

import { Box, SxProps, Theme } from '@mui/material'

type CenteredLayoutProps = {
    children: ReactNode,
    sx?: SxProps<Theme>
}

const CenteredLayout: FC<CenteredLayoutProps> = ({ children, sx }) => (
    <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        px: 6,
        pt: { xs: 11, sm: 12, md: 13, lg: 14 },
        pb: 4,
        ...sx
    }}>
        {children}
    </Box>
)

export default CenteredLayout
