import { FC, ReactNode } from 'react'

import { Box, BoxProps } from '@mui/material'

type PageHeaderProps = BoxProps & {
    children: ReactNode
}

const PageHeader: FC<PageHeaderProps> = ({ children, ...props }) => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                alignItems: { xs: 'normal', sm: 'center' },
                justifyContent: 'space-between',
                mb: 3,
                ...props.sx
            }}
        >
            {children}
        </Box>
    )
}

export default PageHeader
