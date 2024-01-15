import { FC, ReactNode } from 'react'

import { Box } from '@mui/material'

const CenteredBox: FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh'
        }}>
            {children}
        </Box>
    )
}

export default CenteredBox