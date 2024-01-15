import { FC, ReactNode } from 'react'

import { Box } from '@mui/material'

type CenteredLayoutProps = {
    children: ReactNode
}

const CenteredLayout: FC<CenteredLayoutProps> = ({ children }) => (
    <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        px: 6,
        pt: { xs: 10, sm: 11, md: 11.5, lg: 12 },
        pb: 6
    }}>
        {children}
    </Box>
)

export default CenteredLayout
