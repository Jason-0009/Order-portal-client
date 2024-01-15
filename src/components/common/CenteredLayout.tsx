import { FC, ReactNode } from 'react'

import { Box } from '@mui/material'

type CenteredLayoutProps = {
    children: ReactNode
}

const CenteredLayout: FC<CenteredLayoutProps> = ({ children }) => (
    <Box sx={{ display: 'flex', flexDirection: 'column', px: 6, pt: 15 }}>
        {children}
    </Box>
)

export default CenteredLayout
