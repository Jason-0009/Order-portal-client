import { FC, ReactNode } from 'react'
import { Box } from '@mui/material'

type CenteredLayoutProps = {
    children: ReactNode
}

const CenteredLayout: FC<CenteredLayoutProps> = ({ children }) => (
    <Box sx={{ m: 5, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        {children}
    </Box>
)

export default CenteredLayout
