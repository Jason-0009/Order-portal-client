import { FC, ReactNode } from 'react'
import { Box } from '@mui/material'

type CenteredPaginationBoxProps = {
    children: ReactNode
}

const CenteredPaginationBox: FC<CenteredPaginationBoxProps> = ({ children }) => (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
        {children}
    </Box>
)

export default CenteredPaginationBox
