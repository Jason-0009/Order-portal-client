import { FC } from 'react'

import { Box, Typography } from '@mui/material'
import { SentimentDissatisfied } from '@mui/icons-material'

type NoResultsFoundProps = {
    text: string
}

const NoResultsFound: FC<NoResultsFoundProps> = ({ text }) => (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 3 }}>
        <SentimentDissatisfied sx={{
            fontSize: { xs: 35, sm: 37, md: 38, lg: 40 }
        }} />

        <Typography variant="h6" component="h2" sx={{
            mt: 2,
            fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem', lg: '1.25em' }
        }}>
            {text}
        </Typography>
    </Box>
)

export default NoResultsFound
