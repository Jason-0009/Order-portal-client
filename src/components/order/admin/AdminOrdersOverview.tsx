import { FC } from 'react'

import { Box, SxProps, Typography } from '@mui/material'

import useStatistics from '@/hooks/useStatistics'

const AdminOrdersOverview: FC = () => {
    const { data: statistics } = useStatistics()

    const commonStyles: SxProps = { mb: 1, fontSize: '0.7em' }
    const numberStyles: SxProps = { fontWeight: 600, mb: 2 }

    return (
        <Box sx={{
            backgroundColor: '#F7F7F7',
            height: '100%',
            pt: 15,
            pl: 5
        }}>
            <Typography sx={{
                textTransform: 'uppercase',
                color: '#F31515',
                mb: 5
            }}>
                Panoramica
            </Typography>

            <Typography sx={commonStyles}>
                Ordini consegnati oggi
            </Typography>

            <Typography variant="h5" sx={numberStyles}>
                {statistics?.deliveredToday}
            </Typography>

            <Typography sx={commonStyles}>
                Ordini in attesa
            </Typography>

            <Typography variant="h5" sx={numberStyles}>
                {statistics?.pending}
            </Typography>

            <Typography sx={commonStyles}>
                Ordini in arrivo
            </Typography>

            <Typography variant="h5" sx={numberStyles}>
                {statistics?.delivering}
            </Typography>
        </Box>
    )
}

export default AdminOrdersOverview
