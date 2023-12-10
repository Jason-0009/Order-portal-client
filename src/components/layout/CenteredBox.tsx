import { FC, ReactNode } from 'react'
import { Box } from '@mui/material'

type CenteredBoxProps = {
    children: ReactNode
}

const CenteredBox: FC<CenteredBoxProps> = ({ children }) => (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
        {children}
    </Box>
)

export default CenteredBox
