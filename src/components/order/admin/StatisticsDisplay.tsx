import { FC } from 'react'

import { Box, Typography } from '@mui/material'

type StatisticsDisplayProps = {
    count: number | undefined,
    label: string
}

const StatisticsDisplay: FC<StatisticsDisplayProps> = ({ count, label }) => (
    <Box width={230} height={70} sx={theme => ({
        borderRadius: '20px',
        backgroundColor: 'secondary.main',
        p: 2,
        mr: 3,
        boxShadow: `0px 4px 4px 0px ${theme.palette.secondary.main}`
    })}>
        <Typography variant="body2" fontWeight={600}>
            {count}
        </Typography>

        <Typography variant="body2" color="text.secondary">
            {label}
        </Typography>
    </Box>
)

export default StatisticsDisplay