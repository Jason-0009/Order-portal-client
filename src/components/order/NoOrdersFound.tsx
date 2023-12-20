import { FC } from 'react'

import { Box, Typography } from '@mui/material'
import { SentimentDissatisfied } from '@mui/icons-material'

const NoOrdersFound: FC = () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 3 }}>
        <SentimentDissatisfied sx={{ fontSize: 40 }} />

        <Typography variant="h6" component="h2" mt={2}>
            Nessun ordine trovato
        </Typography>
    </Box>
)

export default NoOrdersFound
