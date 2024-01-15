import { FC } from 'react'

import { Box, Typography } from '@mui/material'

type AdminOrdersStatisticsDisplayProps = {
    count: number | undefined,
    label: string
}

const AdminOrdersStatisticsDisplay: FC<AdminOrdersStatisticsDisplayProps> = ({ count, label }) => (
    <Box sx={theme => ({
        width: 230,
        height: { xs: 90, sm: 75, md: 70 },
        borderRadius: '20px',
        backgroundColor: 'secondary.main',
        p: 2,
        mr: 3,
        boxShadow: `0px 4px 4px 0px ${theme.palette.secondary.main}`
    })}>
        <Typography variant="body2" sx={{
            fontWeight: 600,
            fontSize: { xs: '0.7em', sm: '0.75em', md: '0.8em', lg: '0.88em' }
        }}>
            {count}
        </Typography>

        <Typography variant="body2" color="text.secondary" sx={{
            fontSize: { xs: '0.7em', sm: '0.75em', md: '0.8em', lg: '0.88em' }
        }}>
            {label}
        </Typography>
    </Box>
)

export default AdminOrdersStatisticsDisplay