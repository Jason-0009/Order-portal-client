import { FC } from 'react'

import { useTranslation } from 'next-i18next'

import { Box, SxProps, Typography } from '@mui/material'

import useOrderStatistics from '@/hooks/order/useOrderStatistics'

const AdminOrdersOverview: FC = () => {
    const { t: translation } = useTranslation()

    const { statistics } = useOrderStatistics()

    const textStyles: SxProps = { mb: 1, fontSize: '0.7em' }
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
                {translation('overview')}
            </Typography>

            <Typography sx={textStyles}>
                {translation('orderDeliveredToday')}
            </Typography>

            <Typography variant="h5" sx={numberStyles}>
                {statistics?.deliveredToday}
            </Typography>

            <Typography sx={textStyles}>
                {translation('pendingOrders')}
            </Typography>

            <Typography variant="h5" sx={numberStyles}>
                {statistics?.pending}
            </Typography>

            <Typography sx={textStyles}>
                {translation('incomingOrders')}
            </Typography>

            <Typography variant="h5" sx={numberStyles}>
                {statistics?.delivering}
            </Typography>
        </Box>
    )
}

export default AdminOrdersOverview
